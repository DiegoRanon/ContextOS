import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  className = "",
  ...props
}: InputProps) {
  const inputStyles = `
    w-full px-4 py-2.5 
    bg-surface border border-border rounded-lg
    text-foreground placeholder:text-foreground-muted
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all duration-200
    ${error ? "border-error focus:ring-error" : ""}
    ${icon ? "pl-11" : ""}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
            {icon}
          </div>
        )}
        <input className={inputStyles} {...props} />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-error flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-foreground-muted">{helperText}</p>
      )}
    </div>
  );
}

