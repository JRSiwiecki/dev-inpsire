import { type Inspiration } from "@prisma/client";
import Link from "next/link";
import { cache } from "react";
import { db } from "~/server/db";

export const metadata = {
  title: "Top Inspirations",
  description:
    "View the latest and greatest inspirations that other users have generated!",
};

const getInspirations = cache(async () => {
  const inspirations = await db.inspiration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return inspirations;
});

export const revalidate = 0;

export default async function TopInspirations() {
  const inspirations = await getInspirations();

  async function findUser(userId: string) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user?.name;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-4 text-6xl font-bold">Top Inspirations</h1>
      <section className="max-w-8xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        {inspirations.map((inspiration: Inspiration) => (
          <div className="m-2 rounded-lg border-2 p-2" key={inspiration.id}>
            <h3 className="text-2xl">
              <b>
                {inspiration.position}, {inspiration.topic},{" "}
                {inspiration.technology}
              </b>
            </h3>
            <h3 className="text-xl">
              <Link href={`/inspiration/${inspiration.userId}`}>
                <b>{findUser(inspiration.userId)}</b>
              </Link>
            </h3>
            <h3>
              <b>{inspiration.createdAt.toLocaleDateString()}</b>
            </h3>
            <p>{inspiration.savedInspiration}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
