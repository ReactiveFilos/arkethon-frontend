import { Client, HTTPStatusCode, TToken } from "@arkejs/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { getEnvVar } from "@/hooks/use-runtime-env";

import { authOptions } from "./auth";

function isServer() {
  return typeof window === "undefined";
}

export const client = new Client({
  serverUrl: getEnvVar("ARKE_URL", "http://localhost:4000"),
  project: getEnvVar("ARKE_PROJECT_ID"),
  getSession: async () => {
    if (isServer()) {
      return getServerSession(authOptions);
    }

    return (await getSession()) as TToken;
  },
  httpClientConfig: (api) => {
    api.interceptors.request.use((config) => config);
    // api.interceptors.request.use((config) => {
    //   config.headers["ngrok-skip-browser-warning"] = "true";
    //   return config;
    // });
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (
          err.response &&
          err.response.status === HTTPStatusCode.Unauthorized
        ) {
          if (isServer()) {
            redirect("/logout");
          } else {
            window.location.href = "/logout";
          }
        }

        return Promise.reject(err);
      },
    );
    return api;
  },
});

export function getClient() {
  return client;
}

export const unauthorizedClient = new Client({
  serverUrl: getEnvVar("ARKE_URL", "http://localhost:4000"),
  project: getEnvVar("ARKE_PROJECT_ID"),
});
