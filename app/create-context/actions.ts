"use server";
import { createClient } from "@/lib/supabase/server";
import { Context } from "@/lib/supabase/types";
import { redirect } from "next/navigation";

export type ContextResult = {
  context: Context | null;
  errorMsg: string | null;
};

export async function createContext(context: Context): Promise<ContextResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { context: null, errorMsg: "Unauthorized" };
  const { data: newContext, error } = await supabase
    .from("context")
    .insert({ ...context, user_id: user.id })
    .select()
    .single();
  if (error) return { context: null, errorMsg: error.message };

  redirect(`/context/${newContext.id}`);
  return { context: newContext, errorMsg: null };
}
