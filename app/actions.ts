"use server";
import { createClient } from "@/lib/supabase/server";
import { Context } from "@/lib/supabase/types";

export type ContextResult = {
  contexts: Context[] | null;
  errorMsg: string | null;
};

export async function getContexts(): Promise<ContextResult | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { contexts: null, errorMsg: "Unauthorized" };
  const { data, error } = await supabase
    .from("context")
    .select("*")
    .eq("user_id", user.id);
  if (error) return { contexts: null, errorMsg: error.message };
  return { contexts: data, errorMsg: null };
}

export async function createContext(
  context: Context
): Promise<ContextResult | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { contexts: null, errorMsg: "Unauthorized" };
  const { data, error } = await supabase
    .from("context")
    .insert({ ...context, user_id: user.id });
  if (error) return { contexts: null, errorMsg: error.message };
  return { contexts: data, errorMsg: null };
}
