import { getContexts, getSessions } from "./actions";
import ContextList from "./components/context/ContextList";
import Link from "next/link";

export default async function Dashboard() {
  const contextsResult = await getContexts();
  const sessionsResult = await getSessions();

  const sessionsThisWeek = sessionsResult.sessions?.filter((session) => {
    return (
      session.updated_at &&
      new Date(session.updated_at) >=
        new Date(new Date().setDate(new Date().getDate() - 7))
    );
  });

  const focusTimeSeconds =
    sessionsResult.sessions?.reduce((acc, session) => {
      return acc + (session.duration ?? 0);
    }, 0) ?? 0;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Your <span className="gradient-text">Contexts</span>
              </h1>
              <p className="text-lg text-foreground-secondary">
                Organize your work and track your progress
              </p>
            </div>
            <Link
              href="/create-context"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98]"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Context
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {contextsResult?.contexts?.length || 0}
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Active Contexts
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {sessionsThisWeek?.length || 0}
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Sessions This Week
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.floor(focusTimeSeconds / 3600)}h
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Focus Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context List */}
        <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <ContextList contextResult={contextsResult} />
        </div>
      </div>
    </div>
  );
}
