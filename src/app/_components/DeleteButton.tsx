"use client";

import { type Inspiration } from "@prisma/client";
import { api } from "~/trpc/react";

export default function DeleteButton(inspiration: Inspiration) {
  const deleteInspirationMutation =
    api.inspiration.deleteInspiration.useMutation();

  async function deleteInspiration(inspiration: Inspiration) {
    console.log("THE ID ISSSS" + inspiration.id);
    deleteInspirationMutation.mutate({ inspirationId: inspiration.id });
  }

  return (
    <button
      onClick={() => deleteInspiration(inspiration)}
      className="my-2 rounded bg-red-500 px-4 py-2 font-bold hover:bg-red-600"
    >
      Delete
    </button>
  );
}
