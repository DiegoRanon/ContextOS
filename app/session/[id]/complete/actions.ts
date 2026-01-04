"use server";
import { createClient } from "@/lib/supabase/server";
import { Session, SessionReflection } from "@/lib/supabase/types";

export type SessionWithReflection = {
  session: Session | null;
  reflection: SessionReflection | null;
  errorMsg: string | null;
};

export async function getCompletedSession(
  id: string
): Promise<SessionWithReflection> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return { session: null, reflection: null, errorMsg: "Unauthorized" };
  }

  // Fetch session
  const { data: session, error: sessionError } = await supabase
    .from("session")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (sessionError) {
    return {
      session: null,
      reflection: null,
      errorMsg: sessionError.message,
    };
  }

  // Fetch reflection if exists
  let reflection = null;
  if (session.reflection_id) {
    const { data: reflectionData, error: reflectionError } = await supabase
      .from("session_reflection")
      .select("*")
      .eq("id", session.reflection_id)
      .single();

    if (!reflectionError && reflectionData) {
      reflection = reflectionData;
    }
  }

  return { session, reflection, errorMsg: null };
}

