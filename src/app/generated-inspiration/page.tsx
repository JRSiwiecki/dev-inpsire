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
      <p className="max-w-lg">{response}</p>
    </main>
  );
}
