"use client";
import Link from "next/link";
import { register } from "./actions";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function checkPassword(): boolean {
    return password === confirmPassword;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black">
      <form
        action={async (fd: FormData) => {
          setError(null);
          if (!checkPassword()) {
            setError("Passwords do not match");
            setPassword("");
            setConfirmPassword("");
            return;
          }
          const res = await register({
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Register
        </button>
        {error && <p className="text-red-600">{error}</p>}
        <Link
          href="/login"
          className="text-center text-sm text-blue-600 hover:underline"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
