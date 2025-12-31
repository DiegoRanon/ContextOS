"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthResult = { ok: true } | { ok: false; message: string };

function friendlyAuthMessage(raw: string): string {
  const s = raw.toLowerCase();

  if (s.includes("invalid login credentials"))
    return "Email or password is incorrect.";
  if (s.includes("email not confirmed"))
    return "Please confirm your email before logging in.";
  if (s.includes("password should be at least"))
    return "Password is too short.";
  if (s.includes("user already registered"))
    return "An account with this email already exists.";

  return "Something went wrong. Please try again.";
}

export async function login(formData: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const supabase = await createClient();
  const { email, password } = formData;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return { ok: false, message: friendlyAuthMessage(error.message) };

  redirect("/dashboard");
  return { ok: true };
}
