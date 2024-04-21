"use client";

import { useEffect, useState, type FormEvent } from "react";
import Logout from "./Logout";
import { api } from "~/trpc/react";

export default function InspirationField() {
  const [position, setPosition] = useState("");
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");
  const [response, setResponse] = useState("");

  const inspirationGeneration =
    api.inspiration.generateInspiration.useMutation();

  const isLoading = inspirationGeneration.isPending;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (position === "" || topic === "" || technology === "") {
      return;
    }

    inspirationGeneration.mutate({
      position,
      topic,
      technology,
    });
  }

  useEffect(() => {
    if (
      inspirationGeneration.isSuccess &&
      inspirationGeneration.data?.message?.message?.content != null
    ) {
      setResponse(inspirationGeneration.data.message.message.content);
    }
  }, [inspirationGeneration.isSuccess, inspirationGeneration.data]);

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
      <h1 className="bold text-6xl">Project Idea</h1>
      <p className="m-4 max-w-lg">
        {isLoading ? "Generating your project idea" : response}
      </p>
      <button className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
        Save Idea
      </button>
    </main>
  );
}
