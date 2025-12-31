"use client";
import { createContext } from "./actions";
import { useState } from "react";

export default function CreateContext() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 w-full bg-zinc-100 dark:bg-black">
      <h1 className="text-2xl font-bold">Create Context</h1>
      <form
        className="flex flex-col gap-4 p-6 border rounded-md bg-white dark:bg-zinc-900 w-full max-w-sm"
        action={async (fd: FormData) => {
          const newContext = {
            user_id: "",
            created_at: new Date().toISOString(),
            title: String(fd.get("title") ?? ""),
            description: String(fd.get("description") ?? ""),
          };
          const res = await createContext(newContext);
          if (!res.context) setError(res.errorMsg);
        }}
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          className="p-2 border rounded"
        />
        <button
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
          type="submit"
        >
          Create
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
