"use client";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getUser, logout } from "./actions";

export default function NavClient({ user }) {
  return (
    <nav className="flex fixed top-0 flex-col w-full justify-center items-center p-4 bg-zinc-200 dark:bg-black">
      <div className="flex justify-center w-full items-center gap-4">
        <Link href="/">Home</Link>
        {user ? (
          <>
            <Link href="/my-profile">My Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
