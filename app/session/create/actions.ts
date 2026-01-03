"use server";
import { createClient } from "@/lib/supabase/server";
import { Session } from "@/lib/supabase/types";
import { redirect } from "next/navigation";

export type SessionResult = {
  session: Session | null;
  errorMsg: string | null;
};

export type CreateSessionInput = {
  context_id: number;
  duration: number;
  intention?: string;
  notes?: string;
};

export async function createSession(
  session: CreateSessionInput
): Promise<SessionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { session: null, errorMsg: "Unauthorized" };

  const nowIso = new Date().toISOString();
  const { data: newSession, error } = await supabase
    .from("session")
    .insert({
      ...session,
      user_id: user.id,
      created_at: nowIso,
      updated_at: nowIso,
    })
    .select()
    .single();

  if (error) return { session: null, errorMsg: error.message };

  redirect(`/session/${newSession.id}`);
  return { session: newSession, errorMsg: null };
}
