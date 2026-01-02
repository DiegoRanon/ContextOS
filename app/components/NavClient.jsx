"use client";
import Link from "next/link";
import { logout } from "./actions";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    authenticated: true,
  },
  {
    label: "My Profile",
    href: "/my-profile",
    authenticated: true,
  },
];

export default function NavClient({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">
              ContextOS
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1">
            {navItems
              .filter((item) => (user ? true : !item.authenticated))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-light">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle"></div>
                  <span className="text-sm font-medium text-primary">
                    {user.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-error hover:bg-error-light transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-secondary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navItems
                .filter((item) => (user ? true : !item.authenticated))
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              <div className="border-t border-border my-2"></div>
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-foreground-secondary">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-error hover:bg-error-light transition-all duration-200 font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
