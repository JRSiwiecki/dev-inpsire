"use client";

import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function GeneratedInspiration() {
  const data = useSearchParams();

  const apiQuery = api.inspiration.generateInspiration.useQuery({
    position: data.get("position") ?? "",
    topic: data.get("topic") ?? "",
    technology: data.get("technology") ?? "",
  });

  const response = apiQuery.data?.message?.message.content;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="bold text-6xl">Project Idea</h1>
      <p className="m-4 max-w-lg">{response}</p>
      <button className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
        Save Idea
      </button>
    </main>
  );
}
