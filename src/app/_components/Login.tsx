import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <p
        className="cursor-pointer text-white hover:text-gray-300"
        onClick={() => signIn()}
      >
        Login
      </p>
    </>
  );
}
