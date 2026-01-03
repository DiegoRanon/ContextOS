import "server-only";
import { createClient } from "@/lib/supabase/server";
import { Context } from "@/lib/supabase/types";
import type { Session } from "@/lib/supabase/types";

export type ContextResult = {
  context: Context | null;
  errorMsg: string | null;
};

export async function getContext(id: string): Promise<ContextResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { context: null, errorMsg: "Unauthorized" };

  const { data, error } = await supabase
    .from("context")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (error) return { context: null, errorMsg: error.message };
  return { context: data, errorMsg: null };
}

export type ContextSessionsResult = {
  sessions: Session[] | null;
  errorMsg: string | null;
};

export async function getContextSessions(
  contextId: string | number,
  limit = 10
): Promise<ContextSessionsResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { sessions: null, errorMsg: "Unauthorized" };

  const normalizedContextId =
    typeof contextId === "number"
      ? contextId
      : Number.isFinite(Number(contextId))
      ? Number(contextId)
      : contextId;

  const safeLimit = Number.isFinite(limit)
    ? Math.max(1, Math.min(50, limit))
    : 10;

  const { data, error } = await supabase
    .from("session")
    .select("*")
    .eq("user_id", user.id)
    .eq("context_id", normalizedContextId)
    .order("updated_at", { ascending: false })
    .limit(safeLimit);

  if (error) return { sessions: null, errorMsg: error.message };
  return { sessions: data ?? [], errorMsg: null };
}
