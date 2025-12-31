"use client";

import { Context } from "@/lib/supabase/types";

export default function ContextItem({ context }: { context: Context }) {
  return (
    <div className="flex flex-col gap-2 border border-zinc-200 rounded-md p-4">
      <h2 className="text-lg font-bold">{context.title}</h2>
      <p className="text-sm text-zinc-500">
        {context.description ?? "No description"}
      </p>
    </div>
  );
}
