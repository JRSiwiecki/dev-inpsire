"use client";

import { useSession } from "next-auth/react";

import InspirationField from "../_components/InspirationField";

export default function Inspiration() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      {session.status === "authenticated" ? (
        <InspirationField />
      ) : (
        <p>Login to begin generating inspiration!</p>
      )}
    </main>
  );
}
