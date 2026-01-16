"use client";

import { useEffect, useId } from "react";
import Button from "@/app/components/ui/Button";

type Props = {
  open: boolean;
  isLoading: boolean;
  error: string | null;
  response: { suggestion: string; input: unknown } | null;
  onRun: () => void;
  onClose: () => void;
};

export default function AiSuggestionsTestModal({
  open,
  isLoading,
  error,
  response,
  onRun,
  onClose,
}: Props) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="bg-surface rounded-2xl shadow-2xl border border-border p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 id={titleId} className="text-2xl font-bold text-foreground">
                Test AI Suggestions
              </h2>
              <p id={descriptionId} className="text-foreground-secondary">
                Calls the API and shows the raw response for validation.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200"
              disabled={isLoading}
              title="Close"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onRun}
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="flex-1"
              >
                Run API Test
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                disabled={isLoading}
                className="flex-1"
              >
                Close
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
                <p className="text-sm font-medium text-error">{error}</p>
              </div>
            )}

            {response && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-surface-secondary p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Suggestion
                  </p>
                  <p className="text-sm text-foreground-secondary whitespace-pre-wrap">
                    {response.suggestion || "No suggestion returned."}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface-secondary p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Input JSON
                  </p>
                  <pre className="text-xs text-foreground-secondary whitespace-pre-wrap">
                    {JSON.stringify(response.input, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
