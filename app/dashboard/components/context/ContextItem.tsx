"use client";
import { Context } from "@/lib/supabase/types";
import { deleteContext } from "../../actions";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";

export default function ContextItem({ context }: { context: Context }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-lg hover:border-border-hover transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-white"
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
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-foreground mb-1 truncate">
                {context.title}
              </h3>
              <p className="text-foreground-secondary leading-relaxed line-clamp-2">
                {context.description || "No description provided"}
              </p>
            </div>
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>0 sessions</span>
            </div>
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
              <span>Created {new Date(context.created_at ?? "").toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2 sm:items-end">
          <Link
            href={`/context/${context.id}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-[0.98] text-sm"
          >
            <span>Open</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <button
            type="button"
            onClick={async () => {
              if (!context.id) {
                toast.error("Missing context id");
                return;
              }
              
              // Confirm deletion
              if (!confirm(`Are you sure you want to delete "${context.title}"? This action cannot be undone.`)) {
                return;
              }

              setIsDeleting(true);
              try {
                const result = await deleteContext(context.id);
                if (result.errorMsg) {
                  toast.error(result.errorMsg);
                } else {
                  toast.success("Context deleted successfully");
                }
              } catch (error) {
                toast.error("Failed to delete context");
              } finally {
                setIsDeleting(false);
              }
            }}
            disabled={isDeleting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-foreground-secondary hover:text-error hover:bg-error-light border border-border hover:border-error/20 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-sm"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              <>
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
