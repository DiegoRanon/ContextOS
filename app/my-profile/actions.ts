"use server";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/supabase/types";

export type ProfileResult =
  | { ok: true; profile: Profile }
  | { ok: false; message: string };

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return null;
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user?.id)
    .single();
  console.log(error);
  if (error) return null;
  return data;
}

export async function updateProfile(
  profile: Profile
): Promise<ProfileResult | null> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) return null;

  const { data, error } = await supabase
    .from("profile")
    .update(profile)
    .eq("id", user?.user?.id)
    .select()
    .single();
  if (error) return { ok: false, message: error.message };

  return { ok: true, profile: data };
}
