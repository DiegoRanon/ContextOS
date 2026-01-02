"use client";
import Link from "next/link";
import { register } from "./actions";
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function checkPassword(): boolean {
    return password === confirmPassword;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-accent-light via-background to-primary-light">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-foreground-secondary">
            Start your journey to better focus
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8">
          <form
            action={async (fd: FormData) => {
              setError(null);
              if (!checkPassword()) {
                setError("Passwords do not match");
                setPassword("");
                setConfirmPassword("");
                return;
              }
              setIsLoading(true);
              try {
                const res = await register({
                  email: String(fd.get("email") ?? ""),
                  password: String(fd.get("password") ?? ""),
                });
                if (!res.ok) setError(res.message);
              } finally {
                setIsLoading(false);
              }
            }}
            className="flex flex-col gap-5"
          >
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              }
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="At least 8 characters"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                confirmPassword && !checkPassword()
                  ? "Passwords do not match"
                  : undefined
              }
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
              disabled={password !== confirmPassword && confirmPassword !== ""}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-foreground-muted">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full text-center px-4 py-3 rounded-lg border-2 border-border hover:border-border-hover hover:bg-surface-secondary transition-all duration-200 font-medium text-foreground"
          >
            Sign in instead
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-foreground-muted mt-6">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
