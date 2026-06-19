"use client";

import { useState } from "react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h3">Actions</Typography>
        <Typography
          className="font-mono text-gray-600 dark:text-gray-400"
          variant="body-sm"
        >
          Interact with Tamagochi!
        </Typography>
      </div>
      <TamagotchiActions />
    </div>
  );
}

type ActionItem = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tag: string;
  tagStyle: string;
  iconBg: string;
  btnStyle: string;
  alertMsg: string;
};

const actions: ActionItem[] = [
  {
    id: "wordle",
    emoji: "🟩",
    title: "Wordle Time",
    description:
      "Alert your team it's time to take a brain break and guess today's word.",
    tag: "🧠 Fun",
    tagStyle:
      "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-800/60",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    btnStyle: "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800",
    alertMsg: "It's Wordle o'clock!",
  },
  {
    id: "coffee",
    emoji: "☕",
    title: "Coffee Break",
    description: "Step away, breathe, and grab a warm cup with your teammates.",
    tag: "🫶 Wellness",
    tagStyle:
      "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800/60",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
    btnStyle: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
    alertMsg: "Coffee's calling!",
  },
  {
    id: "smoke",
    emoji: "🚬",
    title: "Unhealthy Break",
    description: "Sneaking outside for a smoke. Zero judgment zone.",
    tag: "🤫 Secret",
    tagStyle:
      "bg-zinc-100 text-zinc-500 ring-1 ring-inset ring-zinc-200/80 dark:bg-zinc-800/60 dark:text-zinc-400 dark:ring-zinc-700/60",
    iconBg: "bg-zinc-100 dark:bg-zinc-800/60",
    btnStyle:
      "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600",
    alertMsg: "Meet outside in 2!",
  },
];

function TamagotchiActions() {
  const [sent, setSent] = useState<Record<string, boolean>>({});

  const handleAlert = (id: string) => {
    setSent((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSent((prev) => ({ ...prev, [id]: false })), 3000);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {actions.map((action) => (
        <div
          className="group squircle-4xl flex flex-col gap-5 rounded-2xl border border-zinc-100 bg-white p-6 transition-all duration-200 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
          key={action.id}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div
              className={`squircle-4xl flex h-11 w-11 items-center justify-center text-xl ${action.iconBg}`}
            >
              {action.emoji}
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium text-xs ${action.tagStyle}`}
            >
              {action.tag}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              {action.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed dark:text-zinc-500">
              {action.description}
            </p>
          </div>

          {/* CTA */}
          <Button
            className={`transition-all duration-150 active:scale-[0.98] ${
              sent[action.id]
                ? "!text-zinc-800 dark:!text-zinc-400 cursor-default bg-zinc-100 dark:bg-zinc-800"
                : action.btnStyle
            }`}
            disabled={sent[action.id]}
            onClick={() => handleAlert(action.id)}
            type="button"
          >
            {sent[action.id] ? `${action.alertMsg}` : "Alert everyone"}
          </Button>
        </div>
      ))}
    </div>
  );
}
