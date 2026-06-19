"use client";

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider basePath="/next/api/auth">{children}</SessionProvider>
);

export default SessionWrapper;
