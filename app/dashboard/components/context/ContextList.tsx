"use client";
import { ContextResult } from "../../actions";
import ContextItem from "./ContextItem";
import Link from "next/link";

export default function ContextList({
  contextResult,
}: {
  contextResult: ContextResult;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contexts</h1>
        <Link
          href="/create-context"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Context
        </Link>
      </div>
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
