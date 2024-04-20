import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <p className="m-2">To begin generating inspiration, please log in.</p>
      <button
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600"
        onClick={() => signIn()}
      >
        Login
      </button>
    </>
  );
}
