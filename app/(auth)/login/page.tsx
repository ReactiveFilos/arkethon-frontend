import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Login } from "@/components/auth/login";
import { authOptions } from "@/lib/arke/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return <Login />;
}
