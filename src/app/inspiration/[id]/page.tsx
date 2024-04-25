import { db } from "~/server/db";

type Params = {
  id: string;
};

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

export async function generateMetadata({ params }: { params: Params }) {
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    title: user?.name,
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

export default function Page({ params }: { params: Params }) {
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
