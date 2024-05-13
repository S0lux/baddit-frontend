import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "This is required"),
  newPassword: z.string().min(1, "This is required"),
});
