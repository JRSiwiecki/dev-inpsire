"use client";

import { type Inspiration } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function SavedInspirations() {
  const session = useSession();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = session.data?.user.id;

  const getInspirationsQuery = api.inspiration.getInspirations.useQuery({
    userId,
  });

  useEffect(() => {
    setInspirations(getInspirationsQuery.data);
    setIsLoading(false);
  }, [getInspirationsQuery.data]);

  const deleteInspirationMutation =
    api.inspiration.deleteInspiration.useMutation();

  function handleDeleteInspiration(id: string) {
    deleteInspirationMutation.mutate(
      { inspirationId: id },
      {
        onSuccess: () => {
          setInspirations((prevInspirations) =>
            prevInspirations.filter((inspiration) => inspiration.id !== id),
          );
        },
      },
    );
  }

  return (
    <>
      {!isLoading && inspirations !== undefined ? (
        inspirations.map((inspiration: Inspiration) => (
          <div className="m-2 rounded-lg border-2 p-2" key={inspiration.id}>
            {session.data?.user.id === inspiration.userId && (
              <button
                onClick={() => handleDeleteInspiration(inspiration.id)}
                className="my-2 rounded bg-red-500 px-4 py-2 font-bold hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <h3 className="text-2xl">
              <b>
                {inspiration.position}, {inspiration.topic},{" "}
                {inspiration.technology}
              </b>
            </h3>
            <h3>
              <b>{inspiration.createdAt.toLocaleDateString()}</b>
            </h3>
            <p>{inspiration.savedInspiration}</p>
          </div>
        ))
      ) : (
        <p>Loading inspirations...</p>
      )}
    </>
  );
}
