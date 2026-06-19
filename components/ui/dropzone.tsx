"use client";

import { Primitive } from "@radix-ui/react-primitive";
import { Ban, CheckCircle2, Upload } from "lucide-react";
import type * as React from "react";

import * as DropzonePrimitive from "@/components/ui/dropzone-primitive";
import { cn } from "@/lib/utils";

function Dropzone(props: React.ComponentProps<typeof DropzonePrimitive.Root>) {
  return <DropzonePrimitive.Root data-slot="dropzone" {...props} />;
}

function DropzoneInput(
  props: React.ComponentProps<typeof DropzonePrimitive.Input>
) {
  return <DropzonePrimitive.Input data-slot="dropzone-input" {...props} />;
}

function DropzoneZone({
  className,
  ...props
}: React.ComponentProps<typeof DropzonePrimitive.Zone>) {
  return (
    <DropzonePrimitive.Zone
      className={cn(
        "squircle-3xl cursor-pointer rounded-md border-2 border-input border-dashed p-6 shadow-sm transition-colors hover:border-accent-foreground/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled]:cursor-not-allowed data-[drag-reject]:cursor-no-drop data-[no-click]:cursor-default data-[disabled]:border-inherit data-[drag-active]:border-accent-foreground/50 data-[drag-reject]:border-destructive data-[disabled]:bg-inherit data-[drag-active]:bg-accent data-[drag-reject]:bg-destructive/30 data-[disabled]:opacity-50",
        className
      )}
      data-slot="dropzone-zone"
      {...props}
    />
  );
}

function DropzoneUploadIcon({
  className,
  ...props
}: React.ComponentProps<typeof Upload>) {
  return (
    <>
      <DropzonePrimitive.DragAccepted>
        <CheckCircle2
          className={cn("size-8", className)}
          data-slot="dropzone-upload-icon-accepted"
          {...props}
        />
      </DropzonePrimitive.DragAccepted>
      <DropzonePrimitive.DragRejected>
        <Ban
          className={cn("size-8", className)}
          data-slot="dropzone-upload-icon-rejected"
          {...props}
        />
      </DropzonePrimitive.DragRejected>
      <DropzonePrimitive.DragDefault>
        <Upload
          className={cn("size-8", className)}
          data-slot="dropzone-upload-icon-default"
          {...props}
        />
      </DropzonePrimitive.DragDefault>
    </>
  );
}

function DropzoneGroup({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.div>) {
  return (
    <Primitive.div
      className={cn("grid place-items-center gap-1.5", className)}
      data-slot="dropzone-group"
      {...props}
    />
  );
}

function DropzoneTitle({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.h3>) {
  return (
    <Primitive.h3
      className={cn("font-medium leading-none tracking-tight", className)}
      data-slot="dropzone-title"
      {...props}
    />
  );
}

function DropzoneDescription({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.p>) {
  return (
    <Primitive.p
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="dropzone-description"
      {...props}
    />
  );
}

function DropzoneTrigger(
  props: React.ComponentProps<typeof DropzonePrimitive.Trigger>
) {
  return <DropzonePrimitive.Trigger data-slot="dropzone-trigger" {...props} />;
}

function DropzoneAccepted(
  props: React.ComponentProps<typeof DropzonePrimitive.Accepted>
) {
  return (
    <DropzonePrimitive.Accepted data-slot="dropzone-accepted" {...props} />
  );
}

function DropzoneRejected(
  props: React.ComponentProps<typeof DropzonePrimitive.Rejected>
) {
  return (
    <DropzonePrimitive.Rejected data-slot="dropzone-rejected" {...props} />
  );
}

export {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
  DropzoneUploadIcon,
  DropzoneGroup,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneTrigger,
  DropzoneAccepted,
  DropzoneRejected,
};
