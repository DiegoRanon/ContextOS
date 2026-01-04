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

export type ReflectionData = {
  whatWentWell: string;
  whatBlocked: string;
  whatNext: string;
};

export async function endSessionWithReflection(
  sessionId: string,
  notes: string,
  duration: number,
  reflection: ReflectionData
): Promise<SessionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { session: null, errorMsg: "Unauthorized" };

  console.log("Creating reflection for session:", sessionId);

  // Create session_reflection record
  const { data: reflectionRecord, error: reflectionError } = await supabase
    .from("session_reflection")
    .insert({
      session_id: Number(sessionId),
      user_id: user.id,
      reflection: reflection,
    })
    .select()
    .single();

  if (reflectionError) {
    console.error("Reflection creation error:", reflectionError);
    return { session: null, errorMsg: reflectionError.message };
  }

  console.log("Reflection created:", reflectionRecord.id);

  // Update session with finished_at and reflection_id
  const { data, error } = await supabase
    .from("session")
    .update({
      notes,
      duration,
      finished_at: new Date().toISOString(),
      reflection_id: reflectionRecord.id,
    })
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Session update error:", error);
    return { session: null, errorMsg: error.message };
  }

  console.log("Session updated, redirecting to complete page");

  revalidatePath(`/session/${sessionId}/complete`);
  revalidatePath(`/context/${data.context_id}`);
  redirect(`/session/${sessionId}/complete`);
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
    .update({ notes, duration, finished_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return { session: null, errorMsg: error.message };
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
