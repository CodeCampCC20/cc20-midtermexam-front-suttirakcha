import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ message: "Username is required" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must have at least 8 characters."),
});

export type LoginFields = z.infer<typeof loginSchema>;
