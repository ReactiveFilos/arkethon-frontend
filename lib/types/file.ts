import { z } from "zod";

const fileSchema = z.custom<File>();
const fileListSchema = z.array(fileSchema);

export { fileSchema, fileListSchema };
