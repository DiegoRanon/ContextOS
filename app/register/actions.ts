"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthResult = { ok: true } | { ok: false; message: string };

function friendlyAuthMessage(raw: string): string {
  const s = raw.toLowerCase();

  if (s.includes("already registered")) return "An account already exists.";
  if (s.includes("invalid login")) return "Incorrect email or password.";
  if (s.includes("confirm")) return "Please confirm your email.";
  if (s.includes("password")) return "Password is too short.";

  return "Something went wrong. Please try again.";
}

export async function register(formData: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const supabase = await createClient();
  const { email, password } = formData;

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: "http://localhost:3000/login",
    },
  });

  if (error) return { ok: false, message: friendlyAuthMessage(error.message) };

  redirect("/");
  return { ok: true };
}
