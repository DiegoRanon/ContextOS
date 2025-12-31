"use client";
import { Profile } from "@/lib/supabase/types";
import { useState } from "react";
import { getProfile, updateProfile } from "./actions";
import Link from "next/link";

type User = {
  email?: string;
  id: string;
};

export default function MyProfile({
  user,
  profile,
}: {
  user: User;
  profile: Profile;
}) {
  const [profileState, setProfileState] = useState<Profile | null>(profile);
  const [previousUsername, setPreviousUsername] = useState<string | null>(
    profile.username ?? null
  );

  return (
    <>
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="text-lg">Email: {user.email ?? "No email"}</p>
      <p className="text-lg">Username: {previousUsername ?? "No username"}</p>
      <form
        action={async (fd: FormData) => {
          const username = fd.get("username");
          if (!username) return;
          const result = await updateProfile({
            ...profile,
            username: String(username),
          });
          if (result?.ok) {
            setProfileState(result.profile);
            setPreviousUsername(String(username));
          }
        }}
        className="flex flex-col gap-4 p-6 border rounded-md bg-white dark:bg-zinc-900 w-full max-w-sm"
      >
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          name="username"
          placeholder="Username"
          value={profileState?.username ?? ""}
          onChange={(e) =>
            profileState &&
            setProfileState({ ...profileState, username: e.target.value })
          }
        />
        <button
          type="submit"
          className="flexp-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Update Profile
        </button>
      </form>
      <Link
        className="p-2 bg-black text-white rounded hover:bg-gray-800"
        href="/change-password"
      >
        Change Password
      </Link>
    </>
  );
}
