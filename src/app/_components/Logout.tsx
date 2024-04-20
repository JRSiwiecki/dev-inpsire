import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}
