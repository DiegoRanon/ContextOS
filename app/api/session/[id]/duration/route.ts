import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let duration: number | null = null;
  try {
    const body = await request.json();
    duration = body?.duration;
  } catch {
    // ignore
  }

  const safeDuration =
    typeof duration === "number" && Number.isFinite(duration)
      ? Math.max(0, Math.floor(duration))
      : null;

  if (safeDuration === null) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("session")
    .update({ duration: safeDuration, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ session: data }, { status: 200 });
}
