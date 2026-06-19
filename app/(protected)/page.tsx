import { SpacesView } from "@/components/spaces/spaces-view";
import { authPermission } from "@/lib/auth";

export default async function Page() {
  await authPermission();

  return <SpacesView />;
}
