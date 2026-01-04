"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCompletedSession } from "./actions";
import { Session, SessionReflection } from "@/lib/supabase/types";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

type ReflectionData = {
  whatWentWell?: string;
  whatBlocked?: string;
  whatNext?: string;
};

export default function SessionCompletePage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<Session | null>(null);
  const [reflection, setReflection] = useState<SessionReflection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getCompletedSession(sessionId);
      if (result.errorMsg) {
        setError(result.errorMsg);
      } else {
        setSession(result.session);
        setReflection(result.reflection);
      }
      setLoading(false);
    }
    loadData();
  }, [sessionId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground-secondary">Loading session details...</p>
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

  const reflectionData = reflection?.reflection as ReflectionData | undefined;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </div>
            <span className="text-success font-semibold">Session Completed</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Session <span className="gradient-text">Summary</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            Review your work session and reflection insights.
          </p>
        </div>

        {/* Session Overview Card */}
        <div
          className="bg-surface rounded-2xl shadow-xl border border-border p-8 mb-6 animate-fadeIn"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Session Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-surface-secondary rounded-lg p-5 border border-border">
              <p className="text-sm text-foreground-secondary mb-2">Duration</p>
              <p className="text-3xl font-bold text-foreground font-mono">
                {formatTime(session.duration ?? 0)}
              </p>
            </div>
            <div className="bg-surface-secondary rounded-lg p-5 border border-border">
              <p className="text-sm text-foreground-secondary mb-2">Started</p>
              <p className="text-lg font-semibold text-foreground">
                {formatDate(session.created_at)}
              </p>
            </div>
            <div className="bg-surface-secondary rounded-lg p-5 border border-border">
              <p className="text-sm text-foreground-secondary mb-2">Finished</p>
              <p className="text-lg font-semibold text-foreground">
                {session.finished_at
                  ? formatDate(session.finished_at)
                  : "In Progress"}
              </p>
            </div>
          </div>

          {/* Intention */}
          {session.intention && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-2">
                Your Intention
              </h3>
              <div className="px-4 py-3 bg-primary-light border border-primary/20 rounded-lg">
                <p className="text-foreground leading-relaxed">
                  {session.intention}
                </p>
              </div>
            </div>
          )}

          {/* Session Notes */}
          {session.notes && (
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-2">
                Session Notes
              </h3>
              <div className="px-4 py-3 bg-surface-secondary border border-border rounded-lg">
                <p className="text-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {session.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reflection Card */}
        {reflectionData && (
          <div
            className="bg-surface rounded-2xl shadow-xl border border-border p-8 mb-6 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-accent"
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
              Your Reflection
            </h2>

            <div className="space-y-6">
              {/* What Went Well */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 text-success text-sm font-bold">
                    1
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    What went well?
                  </h3>
                </div>
                <div className="ml-10 px-4 py-3 bg-success/5 border border-success/20 rounded-lg">
                  <p className="text-foreground leading-relaxed">
                    {reflectionData.whatWentWell || (
                      <span className="text-foreground-muted italic">
                        No response provided
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* What Blocked */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-error/20 text-error text-sm font-bold">
                    2
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    What blocked you?
                  </h3>
                </div>
                <div className="ml-10 px-4 py-3 bg-error/5 border border-error/20 rounded-lg">
                  <p className="text-foreground leading-relaxed">
                    {reflectionData.whatBlocked || (
                      <span className="text-foreground-muted italic">
                        No response provided
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* What Next */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    What should you do next?
                  </h3>
                </div>
                <div className="ml-10 px-4 py-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-foreground leading-relaxed">
                    {reflectionData.whatNext || (
                      <span className="text-foreground-muted italic">
                        No response provided
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          <Link href={`/context/${session.context_id}`} className="flex-1">
            <Button variant="primary" size="lg" className="w-full">
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
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

