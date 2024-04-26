"use client";

import { api } from "~/trpc/react";

export default function DeleteButton({
  inspirationId,
}: {
  inspirationId: string;
}) {
  const deleteInspirationMutation =
    api.inspiration.deleteInspiration.useMutation();

  async function deleteInspiration(id: string) {
    deleteInspirationMutation.mutate({ inspirationId: id });
  }

  return (
    <button
      onClick={() => deleteInspiration(inspirationId)}
      className="my-2 rounded bg-red-500 px-4 py-2 font-bold hover:bg-red-600"
    >
      Delete
    </button>
  );
}
