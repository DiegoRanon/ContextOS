"use server";
import { createClient } from "@/lib/supabase/server";
import { Session } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type SessionResult = {
  session: Session | null;
  errorMsg: string | null;
};

export async function getSession(id: string): Promise<SessionResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("session")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { session: null, errorMsg: error.message };
  return { session: data, errorMsg: null };
}

export async function endSession(
  id: string,
  notes: string,
  duration: number
): Promise<SessionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { session: null, errorMsg: "Unauthorized" };

  const { data, error } = await supabase
    .from("session")
    .update({ notes, duration })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return { session: null, errorMsg: error.message };

  revalidatePath(`/context/${data.context_id}`);
  redirect(`/context/${data.context_id}`);
  return { session: data, errorMsg: null };
}

export async function saveSessionDuration(
  id: string,
  duration: number
): Promise<SessionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { session: null, errorMsg: "Unauthorized" };

  const safeDuration = Number.isFinite(duration)
    ? Math.max(0, Math.floor(duration))
    : 0;

  const { data, error } = await supabase
    .from("session")
    .update({ duration: safeDuration })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return { session: null, errorMsg: error.message };
  return { session: data, errorMsg: null };
}

export async function saveSessionNotes(
  id: string,
  notes: string
): Promise<SessionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { session: null, errorMsg: "Unauthorized" };

  const safeNotes = typeof notes === "string" ? notes : "";

  const { data, error } = await supabase
    .from("session")
    .update({ notes: safeNotes, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return { session: null, errorMsg: error.message };
  return { session: data, errorMsg: null };
}
