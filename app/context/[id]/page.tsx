import { getContext } from "./actions";
import Link from "next/link";

export default async function ContextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { context, errorMsg } = await getContext(id);
  if (errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }
  if (!context) {
    return <div>Context not found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-center text-2xl font-bold bg-zinc-100 dark:bg-black">
      <h1 className="text-4xl font-bold">ContextPage {id}</h1>
      <p className="text-lg">{context.title}</p>
      <p className="text-lg">{context.description}</p>
      <Link
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        href={`/session/create?contextId=${context.id}`}
      >
        Create Session
      </Link>
    </div>
  );
}
