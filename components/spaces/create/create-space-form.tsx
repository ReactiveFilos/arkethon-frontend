import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { network } from "@/lib/network";
import { getQueryClient } from "@/lib/tanstack/client";
import { getVisibilityIcon } from "@/lib/utils/visibility/get-visibility-icon";
import { createSpaceFormSchema } from "@/lib/validations/space";

export function CreateSpaceForm({
  showTemplate = false,
}: {
  showTemplate?: boolean;
}) {
  const queryClient = getQueryClient();

  const form = useForm<z.infer<typeof createSpaceFormSchema>>({
    resolver: zodResolver(createSpaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "private",
    },
  });

  async function onSubmit(values: z.infer<typeof createSpaceFormSchema>) {
    await createSpace({
      name: values.name,
      description: values.description || null,
      visibility: values.visibility,
    });
  }

  const { mutateAsync: createSpace, isPending } = useMutation({
    ...network.spaces.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: network.spaces.list.queryOptions().queryKey,
      });
    },
    onError: (error) => {
      console.error("Error creating space:", error);
    },
  });

  const handleApplyTemplate = () => {
    form.setValue("name", "Personal");
    form.setValue("description", "Thoughts, ideas, projects...everything.");
    form.setValue("visibility", "private");
  };

  return (
    <>
      {showTemplate && <PersonalSpaceTemplate onApply={handleApplyTemplate} />}
      <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/40 bg-accent/35 px-4 py-3.5">
        <form
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
          id="create-new-space"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel className="ml-0.5">Name</FieldLabel>
                <Input
                  {...field}
                  autoFocus
                  disabled={isPending}
                  placeholder="Name your space"
                />
                {fieldState.invalid && (
                  <FieldError className="ml-0.5" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="visibility"
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel className="ml-0.5">Visibility</FieldLabel>
                <Select
                  defaultValue={field.value}
                  disabled={isPending}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem disabled value="public">
                      {getVisibilityIcon("public")} Public{" "}
                      <Badge
                        className="mt-px px-1.5 pt-px pb-0.5"
                        variant="outline"
                      >
                        coming soon
                      </Badge>
                    </SelectItem>
                    <SelectItem disabled value="shared">
                      {getVisibilityIcon("shared")} Shared{" "}
                      <Badge
                        className="mt-px px-1.5 pt-px pb-0.5"
                        variant="outline"
                      >
                        coming soon
                      </Badge>
                    </SelectItem>
                    <SelectItem value="private">
                      {getVisibilityIcon("private")}
                      Private
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError className="ml-0.5" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-2 gap-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="ml-0.5">Description</FieldLabel>
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="Describe your space (optional)"
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
            form="create-new-space"
            loading={isPending}
            variant="default"
          >
            <ButtonLoader>Creating...</ButtonLoader>
            <ButtonContent>Create Space</ButtonContent>
          </Button>
        </form>
      </div>
    </>
  );
}

function PersonalSpaceTemplate({ onApply }: { onApply(): void }) {
  return (
    <div className="squircle-4xl mb-4 flex w-full items-center justify-between gap-2 rounded-xl border border-input/40 bg-accent/35 px-4.25 py-3.5">
      <div className="flex flex-col gap-2">
        <span className="-ml-0.5 mb-0.75 inline-flex w-fit items-center rounded bg-amber-500/12 px-1.5 py-0.5 font-mono text-[10px] text-amber-700 uppercase tracking-[0.2em] dark:text-amber-400">
          template &#8226; suggested for you
        </span>
        <Typography className="flex items-center gap-2 font-semibold">
          Personal {getVisibilityIcon("private")}
        </Typography>
        <Typography color="muted-foreground" variant="body-sm">
          Your very first space.
        </Typography>
      </div>
      <Button onClick={onApply} variant="outline">
        <ButtonContent>
          Apply template <ArrowDownIcon />
        </ButtonContent>
      </Button>
    </div>
  );
}
