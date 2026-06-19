"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const CVTextFormSchema = z.object({
  resume: z.string().min(1, "Resume text is required"),
});

export function CVTextForm() {
  const form = useForm<z.infer<typeof CVTextFormSchema>>({
    resolver: zodResolver(CVTextFormSchema),
    defaultValues: {
      resume: FAKE_TEXT,
    },
  });

  function onSubmit(values: z.infer<typeof CVTextFormSchema>) {
    form.reset(values);
  }

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
              <Textarea {...field} placeholder="Insert your CV text here..." />
              {fieldState.invalid && (
                <FieldError className="ml-0.5" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button
          className="col-span-2 mt-1"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          form="create-cv"
          variant="default"
        >
          <ButtonLoader>Saving...</ButtonLoader>
          <ButtonContent>Save CV text</ButtonContent>
        </Button>
      </form>
    </div>
  );
}

const FAKE_TEXT = `Full Stack Developer

EXPERIENCE
Senior Frontend Developer @ TechCorp, Milan (2023–Present)
- Built scalable React/Next.js applications serving 200k+ users
- Led migration from JavaScript to TypeScript, reducing runtime errors by 40%
- Implemented CI/CD pipelines with GitHub Actions and Docker

Full Stack Developer @ StartupXYZ, Remote (2021–2023)
- Developed REST and GraphQL APIs with Node.js and PostgreSQL
- Designed responsive UIs with Tailwind CSS and component libraries
- Collaborated in agile team of 8 engineers

EDUCATION
BSc Computer Science — Politecnico di Milano (2018–2021)

SKILLS
TypeScript · React · Next.js · Node.js · PostgreSQL · Docker · Git · Testing (Jest, Playwright)

LANGUAGES
Italian (native) · English (fluent)`;
