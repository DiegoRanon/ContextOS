"use client";
import { createContext } from "./actions";
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function CreateContext() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-4"
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
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create New <span className="gradient-text">Context</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            Define what you'll be working on and why it matters
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <form
            action={async (fd: FormData) => {
              setError(null);
              setIsLoading(true);
              try {
                const newContext = {
                  user_id: "",
                  created_at: new Date().toISOString(),
                  title: String(fd.get("title") ?? ""),
                  description: String(fd.get("description") ?? ""),
                };
                const res = await createContext(newContext);
                if (!res.context) {
                  setError(res.errorMsg);
                } else {
                  // Success - redirect will happen via server action
                }
              } finally {
                setIsLoading(false);
              }
            }}
            className="flex flex-col gap-6"
          >
            <Input
              name="title"
              type="text"
              label="Context Title"
              placeholder="e.g., Build Portfolio Website, Network+ Certification"
              required
              helperText="What are you working on?"
              icon={
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
            />

            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">
                Description
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-foreground-muted">
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
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <textarea
                  name="description"
                  placeholder="Describe your goals, challenges, or what you hope to learn..."
                  rows={5}
                  className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
              <p className="mt-1.5 text-sm text-foreground-muted">
                Optional: Add more details about this context
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-error-light border border-error/20 animate-fadeIn">
                <svg
                  className="w-5 h-5 text-error flex-shrink-0 mt-0.5"
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
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
                Create Context
              </Button>
              <Link
                href="/dashboard"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-border-hover hover:bg-surface-secondary transition-all duration-200 font-medium text-foreground"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-6 bg-primary-light rounded-xl border border-primary/20 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Tips for creating great contexts
          </h3>
          <ul className="space-y-2 text-foreground-secondary">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Be specific:</strong> "Learn React Hooks" is better than "Learn programming"
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Focus on outcomes:</strong> What will you achieve or learn?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Keep it manageable:</strong> Break large projects into smaller contexts
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
