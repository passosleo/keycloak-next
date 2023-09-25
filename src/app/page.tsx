"use client";
import { Button } from "@/components/Button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("Home ~ session", session);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-full">
      {session ? (
        <>
          <span>
            Signed with {session.user.email} as {session.user.roles[0]}
          </span>
          <Button color="red" onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <span>Not signed in </span>
          <Button color="blue" onClick={() => signIn("keycloak")}>
            Sign in
          </Button>
        </>
      )}
    </div>
  );
}
