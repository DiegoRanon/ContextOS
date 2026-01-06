"use client";

import { useEffect, useId, useRef } from "react";
import Button from "@/app/components/ui/Button";

export type AiInsightChoice = "sessions" | "context";

type Props = {
  open: boolean;
  error: string | null;
  isSaving: boolean;
  value: AiInsightChoice | null;
  onChange: (value: AiInsightChoice) => void;
  onSave: (value: AiInsightChoice) => void;
  onCancel: () => void;
};

export default function AiInsightsModal({
  open,
  error,
  isSaving,
  value,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const titleId = useId();
  const descriptionId = useId();
  const radioId = useId();
  const firstOptionRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the first option so keyboard users can immediately select.
    if (!open) return;
    firstOptionRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="bg-surface rounded-2xl shadow-2xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-md">
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
              <div>
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-foreground mb-1"
                >
                  AI Insights
                </h2>
                <p id={descriptionId} className="text-foreground-secondary">
                  Choose what you want to generate. You can add more insight
                  types later.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCancel}
              aria-label="Close"
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200"
              disabled={isSaving}
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
            {/* Options */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">
                  What should the AI generate?
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-light text-accent">
                  Beta
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="AI insights options"
                className="grid gap-3"
              >
                <label
                  className="group block rounded-xl border border-border bg-background/30 p-4 transition-all duration-200 cursor-pointer hover:bg-surface-secondary hover:border-border-hover focus-within:ring-2 focus-within:ring-primary"
                  htmlFor={radioId}
                >
                  <div className="flex items-start gap-4">
                    <input
                      ref={firstOptionRef}
                      id={radioId}
                      type="radio"
                      name="ai-insight-choice"
                      className="mt-1 h-4 w-4"
                      checked={value === "sessions"}
                      onChange={() => onChange("sessions")}
                      disabled={isSaving}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">
                            Suggestions based on the last 3 sessions
                          </p>
                          <p className="text-sm text-foreground-secondary mt-1">
                            Highlights patterns, blockers, and next actions
                            using your most recent sessions (up to 3).
                          </p>
                        </div>
                        {value === "sessions" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary shrink-0">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground-muted">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-secondary">
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
                          Up to 3 sessions
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-secondary">
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Actionable suggestions
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Display */}
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => value && onSave(value)}
                variant="primary"
                size="lg"
                isLoading={isSaving}
                disabled={!value}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Insights
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                size="lg"
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>

            <p className="text-xs text-foreground-muted">
              Tip: You can use{" "}
              <span className="font-medium text-foreground-secondary">Esc</span>{" "}
              to close this dialog.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
