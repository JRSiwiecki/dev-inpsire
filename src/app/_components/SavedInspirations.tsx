"use client";

import { type Inspiration } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import { useSession } from "next-auth/react";

export default function SavedInspirations({ inspirations }: Inspiration[]) {
  const session = useSession();

  return (
    <>
      {inspirations.map((inspiration: Inspiration) => (
        <div className="m-2 rounded-lg border-2 p-2" key={inspiration.id}>
          {session.data?.user.id === inspiration.userId && (
            <DeleteButton savedInspiration={inspiration} />
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
      ))}
    </>
  );
}
