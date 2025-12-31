"use client";

import { Context } from "@/lib/supabase/types";
import { ContextResult } from "../../actions";
import ContextItem from "./ContextItem";

export default function ContextList({
  contextResult,
}: {
  contextResult: ContextResult | null;
}) {
  console.log(contextResult);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Contexts</h1>
      {contextResult?.contexts && contextResult?.contexts.length > 0 ? (
        <div>
          {contextResult?.contexts?.map((context) => (
            <ContextItem key={context.id} context={context} />
          ))}
        </div>
      ) : (
        <div className="text-red-500">{contextResult?.errorMsg}</div>
      )}
      {contextResult?.contexts && contextResult?.contexts.length === 0 && (
        <div>No contexts found</div>
      )}
    </div>
  );
}
