"use client";
import { useState } from "react";
import { changePassword } from "./actions";

export default function ChangePassword() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-zinc-100 dark:bg-black">
      <h1 className="text-2xl font-bold">Change Password</h1>
      <form
        action={async (fd: FormData) => {
          setError(null);
          if (
            String(fd.get("password") ?? "") !==
            String(fd.get("confirmPassword") ?? "")
          ) {
            setError("Passwords do not match");
            return;
          }
          const res = await changePassword({
            password: String(fd.get("password") ?? ""),
          });
          if (!res.ok) setError(res.message);
        }}
        className="flex flex-col gap-4 p-6 border rounded-md bg-white dark:bg-zinc-900 w-full max-w-sm"
      >
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="p-2 border rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
