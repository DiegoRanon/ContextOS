"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  getSession,
  endSession,
  saveSessionDuration,
  saveSessionNotes,
} from "./actions";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import { Session } from "@/lib/supabase/types";

export default function ActiveSessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notes, setNotes] = useState("");
  const [isEnding, setIsEnding] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef(0);
  const lastSavedRef = useRef<number | null>(null);
  const lastNotesSavedRef = useRef<string | null>(null);
  const hydratedFromServerRef = useRef(false);

  useEffect(() => {
    async function loadSession() {
      const result = await getSession(sessionId);
      if (result.errorMsg) {
        setError(result.errorMsg);
      } else if (result.session) {
        setSession(result.session);
        setNotes(result.session.notes || "");
        lastNotesSavedRef.current = result.session.notes || "";
        setElapsedTime(result.session.duration ?? 0);
        hydratedFromServerRef.current = true;
      }
      setLoading(false);
    }
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    elapsedRef.current = elapsedTime;
  }, [elapsedTime]);

  // Timer
  useEffect(() => {
    if (!session || isPaused || showReflection) return;

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session, isPaused, showReflection]);

  // Save progress every 30 seconds while running
  useEffect(() => {
    if (!session) return;
    if (!hydratedFromServerRef.current) return;
    if (showReflection) return;
    if (elapsedTime <= 0) return;
    if (elapsedTime % 30 !== 0) return;
    if (lastSavedRef.current === elapsedTime) return;

    lastSavedRef.current = elapsedTime;
    void saveSessionDuration(sessionId, elapsedTime);
  }, [elapsedTime, session, sessionId, showReflection]);

  // Save exact current value on route change/unmount + refresh/close (best-effort)
  useEffect(() => {
    if (!session) return;

    const saveWithBeacon = (duration: number) => {
      if (lastSavedRef.current === duration) return;
      lastSavedRef.current = duration;

      try {
        const payload = JSON.stringify({ duration });
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(`/api/session/${sessionId}/duration`, blob);
      } catch {
        // ignore
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveWithBeacon(elapsedRef.current);
      }
    };

    const onPageHide = () => {
      saveWithBeacon(elapsedRef.current);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);

      const current = elapsedRef.current;
      if (lastSavedRef.current !== current) {
        lastSavedRef.current = current;
        void saveSessionDuration(sessionId, current);
      }
    };
  }, [session, sessionId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleNotesBlur = () => {
    if (!session) return;
    const current = notes;
    if (lastNotesSavedRef.current === current) return;
    lastNotesSavedRef.current = current;
    void saveSessionNotes(sessionId, current);
  };

  const handleEndSession = () => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setShowReflection(true);
  };

  const handleSaveReflection = async () => {
    setIsEnding(true);
    try {
      await endSession(sessionId, notes, elapsedTime);
      // Redirect happens in the action
    } catch {
      setError("Failed to end session");
      setIsEnding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground-secondary">Loading session...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-error-light flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Error loading session
            </h3>
            <p className="text-foreground-secondary text-center max-w-md mb-6">
              {error || "Session not found"}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/context/${session.context_id}`}
          className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Context
        </Link>
        {/* Session Active Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            {!isPaused && !showReflection ? (
              <>
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </div>
                <span className="text-success font-semibold">
                  Session Active
                </span>
              </>
            ) : isPaused ? (
              <>
                <div className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </div>
                <span className="text-yellow-600 font-semibold">
                  Session Paused
                </span>
              </>
            ) : (
              <>
                <div className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                </div>
                <span className="text-error font-semibold">Session Ended</span>
              </>
            )}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Focus <span className="gradient-text">Session</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            {showReflection
              ? "Reflect on your work before completing the session."
              : "Stay focused on your work. Take notes and end when you're done."}
          </p>
        </div>

        {/* Timer Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 mb-6 animate-fadeIn">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary to-accent mb-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-6xl font-bold text-foreground mb-2 font-mono">
              {formatTime(elapsedTime)}
            </div>
            <p className="text-foreground-secondary mb-6">
              {isPaused ? "Time paused" : "Time elapsed"}
            </p>

            {/* Pause/Resume Button */}
            {!showReflection && (
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handlePauseResume}
                  variant={isPaused ? "primary" : "secondary"}
                  size="md"
                >
                  {isPaused ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Resume
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Pause
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Intention Card */}
        {session?.intention && !showReflection && (
          <div
            className="bg-surface rounded-xl border border-border p-6 mb-6 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Your Intention
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              {session.intention}
            </p>
          </div>
        )}

        {/* Notes Section - Available during active session */}
        {!showReflection && (
          <div
            className="bg-surface rounded-xl border border-border p-6 mb-6 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Session Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="• What I accomplished&#10;• Challenges I faced&#10;• Ideas or insights&#10;• Next steps"
              rows={10}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono"
            />
            <p className="mt-1.5 text-sm text-foreground-muted">
              Use bullet points (•, -, or *) to organize your thoughts.
              They&apos;ll be saved when you end the session.
            </p>
          </div>
        )}

        {/* End Session Button */}
        {!showReflection && (
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={handleEndSession}
              variant="danger"
              size="lg"
              className="w-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              End Session & Reflect
            </Button>
          </div>
        )}

        {/* Reflection Modal */}
        {showReflection && (
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Session Complete
            </h2>
            <p className="text-foreground-secondary mb-6">
              Your session has ended. Review your notes and complete the
              session.
            </p>

            <div className="space-y-6">
              {/* Session Summary */}
              <div className="bg-surface-secondary rounded-lg p-4 border border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-foreground-secondary mb-1">
                      Duration
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatTime(elapsedTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-secondary mb-1">
                      Status
                    </p>
                    <p className="text-2xl font-bold text-success">Completed</p>
                  </div>
                </div>
              </div>

              {/* Show Intention if exists */}
              {session?.intention && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Intention
                  </label>
                  <div className="px-4 py-3 bg-primary-light border border-primary/20 rounded-lg text-foreground">
                    {session.intention}
                  </div>
                </div>
              )}

              {/* Show Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Session Notes
                </label>
                {notes ? (
                  <div className="px-4 py-3 bg-surface-secondary border border-border rounded-lg text-foreground whitespace-pre-wrap font-mono text-sm">
                    {notes}
                  </div>
                ) : (
                  <p className="text-foreground-muted italic">
                    No notes taken during this session.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleSaveReflection}
                  variant="primary"
                  size="lg"
                  isLoading={isEnding}
                  className="flex-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Complete Session
                </Button>
                <Button
                  onClick={() => {
                    setShowReflection(false);
                    setIsPaused(false);
                  }}
                  variant="outline"
                  size="lg"
                  disabled={isEnding}
                  className="flex-1"
                >
                  Continue Session
                </Button>
              </div>
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-error-light border border-error/20 animate-fadeIn">
                  <svg
                    className="w-5 h-5 text-error shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-error">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
