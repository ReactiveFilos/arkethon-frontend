export const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/json": [".json"],
  "text/markdown": [".md"],
};

export const FILE_EXTENSIONS = {
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  webp: ["image/webp"],
  json: ["application/json"],
  md: ["text/markdown"],
};

export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 10MB
export const MAX_IMAGE_FILE_SIZE = 1 * 1024 * 1024; // 1MB

export function getAcceptFromExtensions(
  extensions: Array<keyof typeof FILE_EXTENSIONS>
) {
  const acceptObj: Record<string, string[]> = {};

  extensions.forEach((ext) => {
    const mimeTypes = FILE_EXTENSIONS[ext];
    if (mimeTypes) {
      mimeTypes.forEach((mime) => {
        if (mime in ACCEPTED_FILE_TYPES) {
          acceptObj[mime] =
            ACCEPTED_FILE_TYPES[mime as keyof typeof ACCEPTED_FILE_TYPES];
        } else {
          acceptObj[mime] = [`.${ext}`];
        }
      });
    }
  });

  return acceptObj;
}
