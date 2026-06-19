"use client";

import { AlertCircle, Download, FileUp, Trash } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { FileRejection } from "react-dropzone";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneInput,
  DropzoneTrigger,
  DropzoneZone,
} from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";
import {
  type FILE_EXTENSIONS,
  getAcceptFromExtensions,
  MAX_FILE_SIZE,
} from "@/lib/utils/dropzone";

export function InputFile({
  acceptedExtensions = [],
  maxFileSize = MAX_FILE_SIZE,
  maxFiles = 1,
  files,
  setFiles,
  disabled,
  label = "Aggiungi",
  classNameInput,
  Tooltip = null,
  multiple = false,
}: {
  acceptedExtensions?: Array<keyof typeof FILE_EXTENSIONS>;
  maxFileSize?: number;
  maxFiles?: number;
  files?: File[];
  setFiles(files: File[]): void;
  disabled: boolean;
  label?: string;
  classNameInput?: string;
  Tooltip?: React.ReactNode | null;
  multiple?: boolean;
}) {
  const acceptedExtensionsText = `${acceptedExtensions.join(", ")}`;

  const [errors, setErrors] = useState<string[]>([]);

  const handleFilesChange = (acceptedFiles: File[]) => {
    setErrors([]);
    const files = acceptedFiles.map(
      (file) =>
        new File([file], file.name.replaceAll("[", "(").replaceAll("]", ")"), {
          type: file.type,
        })
    );

    setFiles(files);
  };

  const handleDropRejected = (fileRejections: FileRejection[]) => {
    setErrors([]);
    const errorMessages = fileRejections.map(({ file, errors }) => {
      if (errors.some((e) => e.code === "file-invalid-type")) {
        return `File "${file.name}" has an invalid type.`;
      }
      if (errors.some((e) => e.code === "file-too-large")) {
        return `File "${file.name}" is too large.`;
      }
      if (errors.some((e) => e.code === "too-many-files")) {
        return `Too many files. Maximum allowed is ${maxFiles}.`;
      }
      return `File "${file.name}" was rejected.`;
    });
    setErrors((prevErrors) => [...prevErrors, ...errorMessages]);
  };

  const handleDownload = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: File
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!file) return;

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = (fileIndex: number) => {
    setFiles((files || []).filter((_, index) => index !== fileIndex));
    setErrors([]);
  };

  if (files && files.length > 0) {
    return files.map((file, index) => (
      <div
        className="squircle-3xl flex size-full items-center justify-between gap-2 overflow-hidden rounded-md border bg-input/5 px-6 py-4 dark:bg-input/30"
        key={file.name + index}
      >
        <Typography className="truncate font-mono" variant="body-sm">
          {file.name}
        </Typography>
        <div className={cn("flex items-center justify-end gap-2")}>
          <Button
            onClick={(e) => handleDownload(e, file)}
            size="icon"
            variant="secondary"
          >
            <Download />
          </Button>
          <Button
            onClick={() => removeFile(index)}
            size="icon"
            variant="destructive"
          >
            <Trash />
          </Button>
        </div>
      </div>
    ));
  }

  const InputLabel = Tooltip ? (
    <div className="flex items-center gap-2">
      <Typography variant="body-sm">{label}</Typography>
      {Tooltip}
    </div>
  ) : (
    <Typography variant="body-sm">{label}</Typography>
  );

  return (
    <Dropzone
      accept={getAcceptFromExtensions(acceptedExtensions)}
      disabled={disabled}
      maxFiles={maxFiles}
      maxSize={maxFileSize}
      multiple={multiple}
      noClick
      onDropAccepted={handleFilesChange}
      onDropRejected={handleDropRejected}
      onFileDialogOpen={() => setErrors([])}
    >
      <DropzoneZone className="squircle-3xl flex h-full flex-1 flex-col items-center justify-center rounded-md border bg-input/5 p-0 shadow-none hover:border-input hover:bg-primary/5 dark:bg-input/30 hover:dark:bg-primary/10">
        <DropzoneInput />
        <DropzoneTrigger
          className={cn(
            "flex size-full flex-col items-center justify-center gap-4 py-8 transition-colors has-disabled:pointer-events-none has-[input:focus]:border-ring has-disabled:opacity-50 has-[input:focus]:ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-primary/5",
            classNameInput
          )}
          type="button"
        >
          <div
            aria-hidden="true"
            className={cn(
              "squircle-3xl flex size-11 shrink-0 items-center justify-center rounded-full border bg-primary/10"
            )}
          >
            <FileUp className="size-4 opacity-60" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            {InputLabel}
            <Typography as="span" color="muted-foreground" variant="body-xs">
              Drag and drop or click to select.
            </Typography>
            {errors.length > 0 && (
              <div
                className="flex flex-col gap-2 py-2 text-destructive"
                role="alert"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <Typography as="span" variant="body-sm">
                    {errors[0]}
                  </Typography>
                </div>
              </div>
            )}
            <Typography as="span" color="muted-foreground" variant="body-xs">
              Accepted extensions: {acceptedExtensionsText}.<br />
              Max size: {Math.round(maxFileSize / 1024 / 1024)}MB.
            </Typography>
          </div>
        </DropzoneTrigger>
      </DropzoneZone>
    </Dropzone>
  );
}
