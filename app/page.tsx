import Link from "next/link";
import { getUser } from "./components/actions";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-accent-light to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Your thinking assistant
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Focus on <span className="gradient-text">what matters</span>
            </h1>

            <p className="text-xl sm:text-2xl text-foreground-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Capture your work context, reflect on progress, and get
              intelligent suggestions—without becoming another task manager.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {user ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] text-center"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] text-center"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-border hover:border-border-hover text-foreground hover:bg-surface-secondary transition-all duration-200 font-semibold text-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for focused work
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Not a todo app. Not a habit tracker. A thinking assistant that
              helps you understand your work patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface rounded-xl p-8 border border-border hover:border-border-hover transition-all duration-300 hover:shadow-lg animate-fadeIn">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Context Capture
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Organize your work into contexts instead of endless task lists.
                Know exactly what you&apos;re working on.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-surface rounded-xl p-8 border border-border hover:border-border-hover transition-all duration-300 hover:shadow-lg animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Session Tracking
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Log focused work sessions with intentions and notes. Build a
                history of your thinking process.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-surface rounded-xl p-8 border border-border hover:border-border-hover transition-all duration-300 hover:shadow-lg animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-xl font-semibold text-foreground mb-3">
                AI Insights
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Get intelligent summaries and next-step suggestions based on
                your work patterns and reflections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
