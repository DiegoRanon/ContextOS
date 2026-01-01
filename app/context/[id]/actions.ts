import { createClient } from "@/lib/supabase/server";
import { Context } from "@/lib/supabase/types";

export type ContextResult = {
  context: Context | null;
  errorMsg: string | null;
};

export async function getContext(id: string): Promise<ContextResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("context")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { context: null, errorMsg: error.message };
  return { context: data, errorMsg: null };
}
