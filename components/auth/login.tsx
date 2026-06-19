"use client";

import { useMutation } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import { network } from "@/lib/network";

export function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: handleLogin, isPending } = useMutation({
    ...network.auth.sign_in_with_oauth.mutationOptions(),
    onError: (error) => {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    },
  });

  async function handleGoogleLogin() {
    await handleLogin({
      provider: "google",
      redirectTo: `${window.location.origin}/oauth?next=/`,
    });
  }

  const {
    mutateAsync: handleAnonymousLogin,
    isPending: isAnonymousLoginPending,
    isSuccess: isAnonymousLoginSuccess,
  } = useMutation({
    ...network.auth.sign_in_anonymously.mutationOptions(),
    onSuccess: (data) => {
      if (!data.user) {
        setError("Something went wrong. Please try again.");
        return;
      }

      router.push("/");
    },
    onError: (error) => {
      console.error("Error during anonymous login:", error);
      setError("Something went wrong. Please try again.");
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <p className="font-bold text-2xl">day by day</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        tracking daily activities made efficiently.
      </p>
      <Button
        className="mt-4 rounded-3xl px-4"
        disabled={isPending}
        loading={isPending}
        onClick={handleGoogleLogin}
      >
        <ButtonLoader iconClassName="mr-2">Login with Google</ButtonLoader>
        <ButtonContent>
          <Image
            alt="Google Logo"
            className="mr-2"
            height={16}
            src="/auth/google.svg"
            width={16}
          />
          Login with Google
        </ButtonContent>
      </Button>
      <Button
        className="mt-4 rounded-3xl px-4"
        disabled={isAnonymousLoginPending}
        loading={isAnonymousLoginPending || isAnonymousLoginSuccess}
        onClick={() => handleAnonymousLogin({})}
        variant="outline"
      >
        <ButtonLoader iconClassName="mr-2">Continue as Guest</ButtonLoader>
        <ButtonContent>
          <UserIcon className="mr-2" />
          Continue as Guest
        </ButtonContent>
      </Button>
      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
