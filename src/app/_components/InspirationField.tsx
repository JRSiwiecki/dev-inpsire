"use client";

import { useEffect, useState, type FormEvent } from "react";
import Logout from "./Logout";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function InspirationField() {
  const session = useSession();

  const [position, setPosition] = useState("");
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");
  const [response, setResponse] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inspirationGeneration =
    api.inspiration.generateInspiration.useMutation();

  const inspirationSaver = api.inspiration.saveInspiration.useMutation();

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

  function saveInspiration() {
    const userId = session.data?.user.id;

    if (response === "" || userId === undefined) {
      return;
    }

    inspirationSaver.mutate({
      userId: userId,
      inspiration: response,
    });

    setButtonDisabled(true);
  }

  useEffect(() => {
    if (
      inspirationGeneration.isSuccess &&
      inspirationGeneration.data?.message?.message?.content != null
    ) {
      setResponse(inspirationGeneration.data.message.message.content);
      setButtonDisabled(false);
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
      <p className="m-4 max-w-lg text-lg leading-relaxed">
        {isLoading
          ? "Generating your project idea..."
          : response.split("\n\n").map((paragraph, index) => (
              <p key={index} className="my-1">
                {paragraph}
              </p>
            ))}
      </p>
      <button
        onClick={saveInspiration}
        disabled={buttonDisabled}
        className={`m-2 rounded px-4 py-2 font-bold 
        ${buttonDisabled ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        Save Idea
      </button>
    </main>
  );
}
