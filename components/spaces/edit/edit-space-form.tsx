import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
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
import { editSpaceFormSchema } from "@/lib/validations/space";

export function EditSpaceForm() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const { data: space } = useQuery({
    ...network.spaces.single.queryOptions({
      id: spaceId,
    }),
  });

  const queryClient = getQueryClient();

  const form = useForm<z.infer<typeof editSpaceFormSchema>>({
    resolver: zodResolver(editSpaceFormSchema),
    defaultValues: {
      name: space?.name || "",
      description: space?.description || "",
      visibility: space?.visibility || "private",
    },
  });

  const { isDirty } = form.formState;

  async function onSubmit(values: z.infer<typeof editSpaceFormSchema>) {
    await editSpace({
      id: spaceId,
      name: values.name,
      description: values.description || null,
      visibility: values.visibility,
    });
  }

  const { mutateAsync: editSpace, isPending } = useMutation({
    ...network.spaces.edit.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: network.spaces.list.queryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: network.spaces.single.queryOptions({ id: spaceId }).queryKey,
      });
    },
    onError: (error) => {
      console.error("Error creating space:", error);
    },
  });

  return (
    <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/40 bg-accent/35 px-4 py-3.5">
      <form
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
        id="edit-new-space"
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
          disabled={isPending || !isDirty}
          form="edit-new-space"
          loading={isPending}
          variant="default"
        >
          <ButtonLoader>Editing...</ButtonLoader>
          <ButtonContent>Edit Space</ButtonContent>
        </Button>
      </form>
    </div>
  );
}
