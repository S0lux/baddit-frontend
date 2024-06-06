import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1, "Please fill out this field"),
    content: z.string().min(1, "Please fill out this field").optional(),
    type: z.string(),
    communityName: z.string().optional(),
    files: z.instanceof(File).array().optional(),
});