import Image from "next/image";
import { getContexts } from "./dashboard/actions";
import ContextList from "./dashboard/components/context/ContextList";
import { Context } from "@/lib/supabase/types";

export default async function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"></div>
  );
}
