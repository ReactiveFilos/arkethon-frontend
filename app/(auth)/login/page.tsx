import { redirect } from "next/navigation";
import { Login } from "@/components/auth/login";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (data?.claims && !error) {
    redirect("/");
  }

  return <Login />;
}
