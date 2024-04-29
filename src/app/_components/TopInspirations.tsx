"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export default function TopInspirations() {
  const inspirations = api.inspiration.getAllInspirations.useQuery();

  return inspirations.isSuccess ? (
    <section className="max-w-8xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {inspirations.data.map((inspiration) => (
        <div className="m-2 rounded-lg border-2 p-2" key={inspiration.id}>
          <h3 className="text-2xl">
            <b>
              {inspiration.position}, {inspiration.topic},{" "}
              {inspiration.technology}
            </b>
          </h3>
          <h3 className="text-xl">
            <Link href={`/inspiration/${inspiration.userId}`}>
              <b>{inspiration.user.name}</b>
            </Link>
          </h3>
          <h3>
            <b>{new Date(inspiration.createdAt).toLocaleDateString()}</b>
          </h3>
          <p>{inspiration.savedInspiration}</p>
        </div>
      ))}
    </section>
  ) : (
    <p>Loading top inspirations...</p>
  );
}
