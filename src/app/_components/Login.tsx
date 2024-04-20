import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <button
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600"
        onClick={() => signIn()}
      >
        Login
      </button>
    </>
  );
}
