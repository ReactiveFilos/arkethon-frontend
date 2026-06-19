"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button, ButtonLoader } from "@/components/ui/button";

export default function Page() {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <p className="font-bold text-2xl">Arke Companion</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        Empower your path with a best friend.
      </p>
      <Button className="mt-4 rounded-3xl px-4" disabled loading>
        <ButtonLoader iconClassName="mr-2">Logging out...</ButtonLoader>
      </Button>
    </div>
  );
}
