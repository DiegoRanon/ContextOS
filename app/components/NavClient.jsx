"use client";
import Link from "next/link";
import { logout } from "./actions";

const navItems = [
  {
    label: "Home",
    href: "/",
    authenticated: false,
  },
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
  return (
    <nav className="fixed top-0 w-full p-4 bg-zinc-200 dark:bg-black">
      <div className="relative flex w-full items-center justify-center">
        <div className="flex items-center gap-4">
          {navItems
            .filter((item) => (user ? true : !item.authenticated))
            .map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
        </div>

        <div className="absolute right-0 top-0 flex items-center gap-4">
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
