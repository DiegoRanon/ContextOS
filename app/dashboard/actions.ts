"use server";
import { createClient } from "@/lib/supabase/server";
import { Context, Session } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

export type ContextResult = {
  contexts: Context[] | null;
  errorMsg: string | null;
};

export type SessionsResult = {
  sessions: Session[] | null;
  errorMsg: string | null;
};

export async function getContexts(): Promise<ContextResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { contexts: null, errorMsg: "Unauthorized" };
  const { data, error } = await supabase
    .from("context")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) return { contexts: null, errorMsg: error.message };
  return { contexts: data, errorMsg: null };
}

export async function deleteContext(id: number): Promise<ContextResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { contexts: null, errorMsg: "Unauthorized" };
  const { data, error } = await supabase
    .from("context")
    .delete()
    .eq("user_id", user.id)
    .eq("id", id);
  if (error) return { contexts: null, errorMsg: error.message };
  revalidatePath("/dashboard");
  return { contexts: data, errorMsg: null };
}

export async function getSessions(): Promise<SessionsResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { sessions: null, errorMsg: "Unauthorized" };
  const { data, error } = await supabase
    .from("session")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });
  if (error) return { sessions: null, errorMsg: error.message };
  return { sessions: data, errorMsg: null };
}
