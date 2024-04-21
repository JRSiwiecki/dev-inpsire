"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { api } from "~/trpc/react";

function GetInspiration() {
  const data = useSearchParams();

  const apiQuery = api.inspiration.generateInspiration.useQuery({
    position: data.get("position") ?? "",
    topic: data.get("topic") ?? "",
    technology: data.get("technology") ?? "",
  });

  const response = apiQuery.data?.message?.message.content;
  const isLoading = apiQuery.isFetching;

  return (
    <p className="m-4 max-w-lg">
      {isLoading ? "Generating your project idea" : response}
    </p>
  );
}

export default function GeneratedInspiration() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="bold text-6xl">Project Idea</h1>
      <Suspense>
        <GetInspiration />
      </Suspense>
      <button className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
        Save Idea
      </button>
    </main>
  );
}
