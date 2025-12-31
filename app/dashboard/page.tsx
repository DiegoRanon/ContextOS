import Image from "next/image";
import { getContexts } from "./actions";
import ContextList from "./components/context/ContextList";
import { Context } from "@/lib/supabase/types";

export default async function Dashboard() {
  const contextsResult = await getContexts();
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ContextList contextResult={contextsResult} />
    </div>
  );
}
