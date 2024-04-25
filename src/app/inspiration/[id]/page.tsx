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

async function getUserInspirations(params: Params) {
  return await db.inspiration.findMany({
    where: {
      userId: params.id,
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
  const userInspirations = await getUserInspirations(params);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-3 text-6xl font-bold">Saved Inspirations</h1>
      <h2 className="mb-3 text-3xl">For {`${user?.name}`}</h2>
      <section className="flex max-w-2xl flex-col">
        {params.id === "undefined"
          ? "Login to view saved inspirations!"
          : userInspirations.map((inspiration) => (
              <div className="m-2 rounded-lg border-2 p-2" key={inspiration.id}>
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
      </section>
    </main>
  );
}
