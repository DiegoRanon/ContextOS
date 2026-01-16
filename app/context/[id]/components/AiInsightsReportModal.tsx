"use client";

import { useEffect, useId } from "react";
import Button from "@/app/components/ui/Button";

type Props = {
  open: boolean;
  report: {
    fullReport: string;
    reportType?: string | null;
    created_at?: string | null;
  } | null;
  onClose: () => void;
};

export default function AiInsightsReportModal({
  open,
  report,
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

  if (!open || !report) return null;

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
                AI Insight Report
              </h2>
              <p id={descriptionId} className="text-foreground-secondary">
                Generated from your last 3 sessions.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200"
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

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface-secondary p-4">
              <p className="text-sm text-foreground-secondary mb-2">
                {report.reportType ? `Type: ${report.reportType}` : "Report"}
                {report.created_at
                  ? ` • ${new Date(report.created_at).toLocaleString()}`
                  : ""}
              </p>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {report.fullReport}
              </p>
            </div>
            <Button onClick={onClose} variant="outline" size="lg">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
