import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <>
      <p
        className="cursor-pointer text-white hover:text-gray-300"
        onClick={() => signOut()}
      >
        Logout
      </p>
    </>
  );
}
