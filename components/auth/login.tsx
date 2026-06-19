"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { network } from "@/lib/network";

const loginFormSchema = z.object({
  email: z.email("Email non valida"),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: handleSignIn, isPending } = useMutation({
    ...network.auth.sign_in.mutationOptions(),
    onSuccess: () => {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    },
    onError: (error) => {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    },
  });

  async function onSubmit({ email, password }: LoginFormValues) {
    setError(null);

    await handleSignIn({ email, password });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="font-bold text-2xl">Arke Companion</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        Empower your path with a best friend.
      </p>
      <Form {...form}>
        <form
          className="mt-8 grid gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-3xl px-4"
                    placeholder="m@example.com"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toLowerCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="rounded-3xl px-4 pr-8"
                      type={isPasswordVisible ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      aria-label="Toggle password visibility"
                      className="-translate-y-1/2 absolute top-1/2 right-2 size-7 text-muted-foreground hover:bg-secondary/60"
                      onClick={togglePasswordVisibility}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {isPasswordVisible ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="squircle-3xl rounded-3xl px-4"
            disabled={isPending}
            loading={isPending}
            type="submit"
          >
            <ButtonLoader iconClassName="mr-2">Sign-in</ButtonLoader>
            <ButtonContent>Sign-in</ButtonContent>
          </Button>
          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
