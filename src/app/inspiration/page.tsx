"use client";

import type { FormEvent } from "react";
import { useSession } from "next-auth/react";
import Login from "../_components/Login";
import Logout from "../_components/Logout";

export default function Inspiration() {
  const session = useSession();
  console.log(session);

  return session.status === "authenticated" ? <InspirationField /> : <Login />;
}

function InspirationField() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 p-5 text-white">
      <h1 className="mb-4 text-6xl font-bold">Inspiration</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="m-2 self-end">
            <label htmlFor="position" className="mx-2">
              Software Field/Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className="text-black"
            />
          </div>
          <div className="m-2 self-end">
            <label htmlFor="topic" className="mx-2">
              Topic within Field/Position
            </label>
            <input type="text" name="topic" id="topic" className="text-black" />
          </div>
          <div className="m-2 self-end">
            <label htmlFor="topic" className="mx-2">
              Technology in Field
            </label>
            <input
              type="text"
              name="technology"
              id="technology"
              className="text-black"
            />
          </div>
          <button className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
            Get Inspired
          </button>
        </div>
      </form>
      <Logout />
    </main>
  );
}
