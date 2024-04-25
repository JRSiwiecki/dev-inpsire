import { db } from "~/server/db";

async function getUserIds() {
  const users = await db.user.findMany();
  return users;
}

export async function generateStaticParams() {
  const users = await getUserIds();

  return users.map((user) => ({
    id: user.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <p>
        {params.id === "undefined"
          ? "Login to view saved inspirations!"
          : params.id.toString()}
      </p>
    </>
  );
}
