import { getUser } from "../components/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfile, updateProfile } from "./actions";
import { Profile } from "@/lib/supabase/types/profile";
import MyProfile from "./MyProfile";

export default async function ProfilePage() {
  const user = await getUser();
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="text-red-500 text-center flex items-center justify-center h-screen">
        No profile found
      </div>
    );
  }
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-zinc-100 dark:bg-black">
      <MyProfile user={user} profile={profile} />
    </div>
  );
}
