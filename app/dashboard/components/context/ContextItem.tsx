"use client";

import { Context } from "@/lib/supabase/types";

export default function ContextItem({ context }: { context: Context }) {
  return (
    <div className="flex flex-col gap-2 border border-zinc-200 rounded-md p-4"></div>
  );
}
