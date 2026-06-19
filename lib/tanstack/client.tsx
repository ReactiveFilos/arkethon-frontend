"use client";

import {
  environmentManager,
  type QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/tanstack/query-client";

let browserQueryClient: QueryClient;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: create singleton query client instance
  // This ensures we reuse the same client across re-renders,
  // which is important for maintaining cache consistency
  if (!browserQueryClient) browserQueryClient = makeQueryClient();

  return browserQueryClient;
}

export default function QueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
