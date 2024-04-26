import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(1, "Please fill out this field"),
  password: z.string().min(1, "Please fill out this field"),
});
