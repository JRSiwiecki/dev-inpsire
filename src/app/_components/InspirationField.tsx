"use client";

import { useState, type FormEvent } from "react";
import Logout from "./Logout";
import { useRouter } from "next/navigation";

export default function InspirationField() {
  const router = useRouter();
  const [position, setPosition] = useState("");
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (position === "" || topic === "" || technology === "") {
      return;
    }

    router.push(
      `/generated-inspiration?position=${position}&topic=${topic}&technology=${technology}`,
    );
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
              onChange={(event) => setPosition(event.target.value)}
            />
          </div>
          <div className="m-2 self-end">
            <label htmlFor="topic" className="mx-2">
              Topic within Field/Position
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              className="text-black"
              onChange={(event) => setTopic(event.target.value)}
            />
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
              onChange={(event) => setTechnology(event.target.value)}
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
