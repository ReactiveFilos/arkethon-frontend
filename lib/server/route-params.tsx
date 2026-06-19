import { headers } from "next/headers";

export async function getRouteParams() {
  const headersList = await headers();

  const url = new URL(headersList.get("x-url") || "http://localhost");

  const path = url.pathname;
  const pathSegments = path.split("/").filter(Boolean);

  const spaceId = pathSegments[1] || null;
  const threadId = pathSegments[3] || null;

  return { spaceId, threadId };
}
