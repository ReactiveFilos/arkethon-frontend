import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cache } from "react";
import { makeQueryClient } from "@/lib/tanstack/query-client";

export const getServerQueryClient = cache(makeQueryClient);

export function HydrateClient({ children }: { children: React.ReactNode }) {
  const queryClient = getServerQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
