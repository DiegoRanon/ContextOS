"use client";

import Button from "@/app/components/ui/Button";

type Props = {
  open: boolean;
  title: string;
  description: string;
  error: string | null;
  isSaving: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function EditContextModal({
  open,
  title,
  description,
  error,
  isSaving,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Context"
          className="bg-surface rounded-2xl shadow-2xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Edit Context
          </h2>
          <p className="text-foreground-secondary mb-6">
            Update the title and description of your context.
          </p>

          <div className="space-y-5">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Enter context title"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Describe your context..."
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              />
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
                onClick={onSave}
                variant="primary"
                size="lg"
                isLoading={isSaving}
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
                Save Changes
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
          </div>
        </div>
      </div>
    </>
  );
}


