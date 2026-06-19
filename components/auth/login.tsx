"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import { network } from "@/lib/network";

export function Login() {
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: handleLogin, isPending } = useMutation({
    ...network.auth.sign_in.mutationOptions(),
    onError: (error) => {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <p className="font-bold text-2xl">Arke Companion</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        Empower your path with a best friend.
      </p>
      <Button
        className="mt-4 rounded-3xl px-4"
        disabled={isPending}
        loading={isPending}
        onClick={handleLogin}
      >
        <ButtonLoader iconClassName="mr-2">Sign-in</ButtonLoader>
        <ButtonContent>Sign-in</ButtonContent>
      </Button>
      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
