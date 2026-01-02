"use client";
import { ContextResult } from "../../actions";
import ContextItem from "./ContextItem";
import Link from "next/link";

export default function ContextList({
  contextResult,
}: {
  contextResult: ContextResult;
}) {
  if (contextResult?.errorMsg) {
    return (
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
          Error loading contexts
        </h3>
        <p className="text-foreground-secondary text-center max-w-md">
          {contextResult.errorMsg}
        </p>
      </div>
    );
  }

  if (!contextResult?.contexts || contextResult.contexts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary-light to-accent-light flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-primary"
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
        <h3 className="text-2xl font-bold text-foreground mb-3">
          No contexts yet
        </h3>
        <p className="text-foreground-secondary text-center max-w-md mb-6">
          Create your first context to start organizing your work and tracking
          your progress. Think of contexts as different projects or areas of
          focus.
        </p>
        <Link
          href="/create-context"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98]"
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
          Create Your First Context
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contextResult.contexts.map((context, index) => (
        <div
          key={context.id}
          className="animate-slideIn"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <ContextItem context={context} />
        </div>
      ))}
    </div>
  );
}
