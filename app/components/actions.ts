"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthResult = { ok: true } | { ok: false; message: string };

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function logout(): Promise<AuthResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
