import TopInspirations from "~/app/_components/TopInspirations";

export const metadata = {
  title: "Top Inspirations",
  description:
    "View the latest and greatest inspirations that other users have generated!",
};

export default async function page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-4 text-6xl font-bold">Top Inspirations</h1>
      <TopInspirations />
    </main>
  );
}
