"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { network } from "@/lib/network";
import { getQueryClient } from "@/lib/tanstack/client";

const CVTextFormSchema = z.object({
  resume: z.string().min(1, "Resume text is required"),
});

export function CVTextForm() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const queryClient = getQueryClient();

  const form = useForm<z.infer<typeof CVTextFormSchema>>({
    resolver: zodResolver(CVTextFormSchema),
    defaultValues: {
      resume: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CVTextFormSchema>) {
    await editCVText({
      userId: userId as string,
      data: {
        resume: values.resume,
      },
    });
  }

  const { mutateAsync: editCVText, isPending } = useMutation({
    ...network.auth.edit_user.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: network.auth.get_user.queryOptions().queryKey,
      });
    },
  });

  return (
    <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/40 bg-accent/35 px-4 py-3.5">
      <form
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
        id="create-cv"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="resume"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-2 gap-2"
              data-invalid={fieldState.invalid}
            >
              <Textarea
                {...field}
                disabled={isPending}
                placeholder="Insert your CV text here..."
              />
              {fieldState.invalid && (
                <FieldError className="ml-0.5" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button
          className="col-span-2 mt-1"
          disabled={isPending}
          form="create-cv"
          loading={isPending}
          variant="default"
        >
          <ButtonLoader>Saving...</ButtonLoader>
          <ButtonContent>Save CV text</ButtonContent>
        </Button>
      </form>
    </div>
  );
}
