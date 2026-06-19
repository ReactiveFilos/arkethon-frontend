"use client";
// Install AI Elements components:
// npx ai-elements@latest add conversation message prompt-input

import {
  IconBolt,
  IconMessageCircle,
  IconPaperclip,
} from "@tabler/icons-react";
import type { ChatStatus } from "ai";
import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";

interface DemoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: DemoMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "**Hey, welcome back.** I'm here to help you level up your dev skills.\n\n- Review your React architecture\n- Suggest testing strategies\n- Improve your DevOps workflow\n\nWhat are you working on today?",
  },
  {
    id: "question",
    role: "user",
    content: "Can you give me a quick overview of my stack based on my CV?",
  },
  {
    id: "answer",
    role: "assistant",
    content:
      "Sure! Based on your profile, your strongest area is **React & Next.js**. You've built production apps with TypeScript and component libraries, which is solid. Your next growth areas look like **testing coverage** and **DevOps automation** — want to dig into any of those?",
  },
];

const RESPONSES = [
  "### React\n\nYour React skills are strong. A few things to push further:\n\n- Adopt **Server Components** in Next.js App Router to reduce client bundle size.\n- Use `useReducer` + context for complex local state instead of prop drilling.\n- Consider **Zustand** or **Jotai** for lightweight global state.",
  "### Testing\n\nYour CV mentions Jest and Playwright — great combo. Here's how to go deeper:\n\n- Aim for **unit tests** on pure logic, **integration tests** on API routes, and **E2E tests** on critical user flows.\n- Use `@testing-library/react` for component tests that reflect real user interactions.\n- Set up **coverage thresholds** in CI to prevent regressions.",
  "### DevOps\n\nYou have CI/CD with GitHub Actions and Docker — solid foundation. Next steps:\n\n- Add **multi-stage Docker builds** to reduce image size.\n- Use **environment-based deploy previews** (e.g. Vercel or Railway) for every PR.\n- Set up **Dependabot** to keep dependencies up to date automatically.",
];

const pickResponse = (index: number) => RESPONSES[index % RESPONSES.length];

export default function Ai05() {
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<ChatStatus>("ready");
  const replyTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    },
    []
  );

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const newMessage: DemoMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setStatus("submitted");

    replyTimeoutRef.current = window.setTimeout(() => {
      const response: DemoMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: pickResponse(messages.length),
      };

      setMessages((prev) => [...prev, response]);
      setStatus("ready");
    }, 900);
  };

  return (
    <div className="w-full px-4">
      <div className="flex h-[90vh] w-full flex-col border-none bg-card">
        <Conversation>
          <ConversationContent className="gap-6 pl-1">
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent
                  className={cn(
                    "leading-relaxed",
                    message.role === "assistant" && "max-w-prose"
                  )}
                >
                  {message.role === "assistant" ? (
                    <MessageResponse>{message.content}</MessageResponse>
                  ) : (
                    <p className="whitespace-pre-wrap text-pretty">
                      {message.content}
                    </p>
                  )}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="bg-background">
          <PromptInput
            className="squircle-3xl w-full shadow-lg [&>[data-slot=input-group]]:border-x-0 [&>[data-slot=input-group]]:border-b-0 [&>[data-slot=input-group]]:shadow-none [&>[data-slot=input-group]]:focus-within:border-border/80 [&>[data-slot=input-group]]:focus-within:outline-none [&>[data-slot=input-group]]:focus-within:ring-0 [&>[data-slot=input-group]]:focus-within:ring-transparent [&>[data-slot=input-group]]:focus-within:ring-offset-0"
            onSubmit={(message) => handleSend(message.text)}
          >
            <PromptInputTextarea
              onChange={(event) => setInputValue(event.currentTarget.value)}
              placeholder="Ask about the block, UI patterns, or an AI workflow"
              value={inputValue}
            />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton aria-label="Attach">
                  <IconPaperclip className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="Quick prompt">
                  <IconBolt className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="New chat">
                  <IconMessageCircle className="size-4" />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit
                disabled={!inputValue.trim() || status !== "ready"}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
