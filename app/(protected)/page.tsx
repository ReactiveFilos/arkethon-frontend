import { Home } from "@/components/home/home";
// import { authPermission } from "@/lib/arke/auth";

export default async function Page() {
  // await authPermission("home.view");

  return <Home />;
}
