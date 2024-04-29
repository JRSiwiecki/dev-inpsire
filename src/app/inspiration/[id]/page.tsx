import SavedInspirations from "~/app/_components/SavedInspirations";
import { db } from "~/server/db";

type Params = {
  id: string;
};

async function getUserIds() {
  const users = await db.user.findMany();
  return users;
}

async function getUser(params: Params) {
  return await db.user.findUnique({
    where: {
      id: params.id,
    },
  });
}

export async function generateStaticParams() {
  const users = await getUserIds();

  return users.map((user) => ({
    id: user.id,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const user = await getUser(params);

  return {
    title: `${user?.name}'s Inspirations`,
    description: `Saved inspirations for ${user?.name}`,
    openGraph: {
      title: user?.name,
      description: `Saved inspirations for ${user?.name}`,
      images: [
        {
          url: user?.image,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const user = await getUser(params);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-3 text-6xl font-bold">Saved Inspirations</h1>
      {user ? (
        <h2 className="mb-3 text-3xl">For {user.name}</h2>
      ) : (
        <h2 className="mb-3 text-3xl">
          Login and generate some inspiration to see them saved here!
        </h2>
      )}

      <section className="max-w-8xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        {user ? (
          <SavedInspirations userId={user.id} />
        ) : (
          <p>Loading user data...</p>
        )}
      </section>
    </main>
  );
}
