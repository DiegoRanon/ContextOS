import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const contextId = (await params).id;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Example: count sessions for this contextId
  const { count, error } = await supabase
    .from("session")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("context_id", contextId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ numberOfSessions: count ?? 0 });
}
