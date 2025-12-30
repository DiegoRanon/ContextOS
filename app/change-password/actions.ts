"use server";
import { createClient } from "@/lib/supabase/server";

export type AuthResult = { ok: true } | { ok: false; message: string };

function friendlyAuthMessage(message: string): string {
  switch (message) {
    case "Invalid login credentials":
      return "Invalid email or password";
    case "Email not confirmed":
      return "Email not confirmed";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function changePassword(formData: {
  password: string;
}): Promise<AuthResult> {
  const supabase = await createClient();
  const { password } = formData;
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) return { ok: false, message: friendlyAuthMessage(error.message) };
  return { ok: true };
}
