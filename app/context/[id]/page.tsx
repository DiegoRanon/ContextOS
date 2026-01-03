import { getContext, getContextSessions } from "./actions";
import Link from "next/link";
import Badge from "@/app/components/ui/Badge";

export default async function ContextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { context, errorMsg } = await getContext(id);

  const formatDuration = (seconds: number) => {
    const s = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
    if (minutes > 0) return `${minutes}m ${String(secs).padStart(2, "0")}s`;
    return `${secs}s`;
  };

  if (errorMsg) {
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
              Error loading context
            </h3>
            <p className="text-foreground-secondary text-center max-w-md mb-6">
              {errorMsg}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold"
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
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!context) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Context not found
            </h3>
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

  const sessionsResult = context.id
    ? await getContextSessions(context.id)
    : await getContextSessions(id);
  const sessions = sessionsResult.sessions ?? [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <Link
            href="/dashboard"
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
            Back to Dashboard
          </Link>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                {context.title}
              </h1>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {context.description || "No description provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-foreground-muted">
            <Badge variant="primary">Active</Badge>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                Created {new Date(context.created_at ?? "").toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-surface rounded-xl border border-border p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href={`/session/create?contextId=${context.id}`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Start Session</p>
                    <p className="text-sm text-white/80">Begin focused work</p>
                  </div>
                </Link>
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-border-hover hover:bg-surface-secondary transition-all duration-200 group text-left">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Insights</p>
                    <p className="text-sm text-foreground-secondary">
                      Get suggestions
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Sessions List */}
            <div className="bg-surface rounded-xl border border-border p-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Recent Sessions
              </h2>
              {sessionsResult.errorMsg ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
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
                  <p className="text-foreground-secondary">
                    {sessionsResult.errorMsg}
                  </p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-foreground-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-foreground-secondary">
                    No sessions yet. Start your first session to begin tracking
                    your work.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((s, idx) => {
                    const updatedLabel = s.updated_at
                      ? new Date(s.updated_at).toLocaleString()
                      : "Unknown";
                    const title =
                      s.intention && s.intention.trim().length > 0
                        ? s.intention
                        : `Session #${sessions.length - idx}`;

                    return (
                      <Link
                        key={s.id}
                        href={`/session/${s.id}`}
                        className="block rounded-xl border border-border hover:border-border-hover hover:bg-surface-secondary transition-all duration-200 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">
                                {title}
                              </h3>
                            </div>
                            <p className="text-sm text-foreground-secondary truncate">
                              {s.notes && s.notes.trim().length > 0
                                ? s.notes.replace(/\s+/g, " ").trim()
                                : "No notes yet."}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-xs text-foreground-muted shrink-0">
                            <span>{formatDuration(s.duration ?? 0)}</span>
                            <span>Updated {updatedLabel}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-surface rounded-xl border border-border p-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground-secondary">
                      Total Sessions
                    </span>
                    <span className="text-lg font-bold text-foreground">0</span>
                  </div>
                  <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground-secondary">
                      Focus Time
                    </span>
                    <span className="text-lg font-bold text-foreground">0h</span>
                  </div>
                  <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground-secondary">
                      Reflections
                    </span>
                    <span className="text-lg font-bold text-foreground">0</span>
                  </div>
                  <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-surface rounded-xl border border-border p-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground-secondary">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Last session: Never</span>
                </div>
                <div className="flex items-center gap-3 text-foreground-secondary">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>This week: 0 sessions</span>
                </div>
                <div className="flex items-center gap-3 text-foreground-secondary">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>All time: 0 sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
