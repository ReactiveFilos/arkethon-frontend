"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, ButtonLoader } from "@/components/ui/button";
import { useSupabaseClient } from "@/lib/supabase/use-supabase-client";

export default function Page() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      router.replace("/login");
    }

    logout();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <p className="font-bold text-2xl">day by day</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        tracking daily activities made efficiently.
      </p>
      <Button className="mt-4 rounded-3xl px-4" disabled loading>
        <ButtonLoader iconClassName="mr-2">Logging out...</ButtonLoader>
      </Button>
    </div>
  );
}
