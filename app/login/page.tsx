"use client";
import Link from "next/link";
import { login } from "./actions";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black">
      <form
        action={async (fd: FormData) => {
          setError(null);
          const res = await login({
            email: String(fd.get("email") ?? ""),
            password: String(fd.get("password") ?? ""),
          });
          if (!res.ok) setError(res.message);
        }}
        className="flex flex-col gap-4 p-6 border rounded-md bg-white dark:bg-zinc-900 w-full max-w-sm"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Login
        </button>
        {error && <p className="text-red-600">{error}</p>}
        <Link href="/register">Register</Link>
      </form>
    </div>
  );
}
