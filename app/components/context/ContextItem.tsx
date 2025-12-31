"use client";

import { Context } from "@/lib/supabase/types";

export default function ContextItem({ context }: { context: Context }) {
  return <div>{context.title}</div>;
}
