import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-4 text-6xl font-bold">Dev Inspire</h1>
      <p className="mb-8 text-lg ">
        Get inspired with new and challenging project ideas for the next bullet
        point on your resume!
      </p>
      <Link href="/inspiration">
        <button className="rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
          Get Started
        </button>
      </Link>
    </main>
  );
}
