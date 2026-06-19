// import { authPermission } from "@/lib/arke/auth";

import { Home } from "@/components/home/home";

export default async function Page() {
  // await authPermission("home.view");

  return <Home />;
}
