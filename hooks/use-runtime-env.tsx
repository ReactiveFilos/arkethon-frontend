import * as React from "react";

type RuntimeEnv = {
  ARKE_URL: string;
  ARKE_PROJECT_ID: string;
};

declare global {
  interface Window {
    __ENV__: RuntimeEnv;
  }
}

export function RuntimeEnvScript() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
      dangerouslySetInnerHTML={{
        __html: `window.__ENV__ = ${JSON.stringify({
          ARKE_URL: process.env.ARKE_URL,
          ARKE_PROJECT_ID: process.env.ARKE_PROJECT_ID,
        })}`,
      }}
    />
  );
}

export function useRuntimeEnv() {
  const [env, setEnv] = React.useState<RuntimeEnv | null>(null);

  React.useEffect(() => {
    setEnv(window.__ENV__);
  }, []);

  return env;
}

export function getEnvVar(variable: keyof RuntimeEnv, defaultValue?: string) {
  if (typeof window !== "undefined") {
    return window.__ENV__?.[variable] ?? defaultValue;
  }

  return process.env?.[variable] ?? defaultValue;
}
