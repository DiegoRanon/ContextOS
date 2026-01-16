import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ReflectionRecord = {
  id: number;
  reflection: unknown;
};

export async function POST(
  _request: NextRequest,
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

  const { data: context, error: contextError } = await supabase
    .from("context")
    .select("id,title,description")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (contextError || !context) {
    return NextResponse.json(
      { error: contextError?.message || "Context not found" },
      { status: 404 }
    );
  }

  const { data: sessions, error: sessionsError } = await supabase
    .from("session")
    .select("id,notes,reflection_id,updated_at")
    .eq("user_id", user.id)
    .eq("context_id", context.id)
    .order("updated_at", { ascending: false })
    .limit(3);

  if (sessionsError) {
    return NextResponse.json({ error: sessionsError.message }, { status: 400 });
  }

  if (!sessions || sessions.length === 0) {
    return NextResponse.json(
      { error: "No sessions available for suggestions." },
      { status: 400 }
    );
  }

  const reflectionIds = sessions
    .map((session) => session.reflection_id)
    .filter((id): id is number => typeof id === "number");

  let reflectionById: Record<number, ReflectionRecord> = {};
  if (reflectionIds.length > 0) {
    const { data: reflections, error: reflectionsError } = await supabase
      .from("session_reflection")
      .select("id,reflection")
      .in("id", reflectionIds);

    if (reflectionsError) {
      return NextResponse.json(
        { error: reflectionsError.message },
        { status: 400 }
      );
    }

    reflectionById = (reflections ?? []).reduce<Record<number, ReflectionRecord>>(
      (acc, reflection) => {
        acc[reflection.id] = reflection;
        return acc;
      },
      {}
    );
  }

  const inputPayload = {
    contextInfo: {
      contextTitle: context.title ?? "",
      contextDescription: context.description ?? "",
    },
    last3Reflections: sessions.map((session) => ({
      reflection: session.reflection_id
        ? reflectionById[session.reflection_id]?.reflection ?? null
        : null,
      sessionNotes: session.notes ?? "",
    })),
  };

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You are a focused work assistant. Summarize the last 3 sessions and provide concise, actionable next-step suggestions.",
          },
          {
            role: "user",
            content: `Use this JSON as your only source of truth:\n${JSON.stringify(
              inputPayload,
              null,
              2
            )}`,
          },
        ],
      }),
    }
  );

  if (!openaiResponse.ok) {
    const errorBody = await openaiResponse.text();
    return NextResponse.json(
      {
        error: "OpenAI request failed",
        details: errorBody,
      },
      { status: 502 }
    );
  }

  const responseJson = await openaiResponse.json();
  const suggestion =
    responseJson?.choices?.[0]?.message?.content?.trim() ?? "";

  if (!suggestion) {
    return NextResponse.json(
      { error: "OpenAI returned an empty response." },
      { status: 502 }
    );
  }

  const { data: report, error: reportError } = await supabase
    .from("context_reflection")
    .insert({
      context_id: context.id,
      user_id: user.id,
      reportType: "last3Sessions",
      fullReport: suggestion,
    })
    .select()
    .single();

  if (reportError) {
    return NextResponse.json({ error: reportError.message }, { status: 400 });
  }

  return NextResponse.json({
    report,
    input: inputPayload,
  });
}
