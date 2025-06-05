import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string({ message: "Username is required" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must have at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type RegisterFields = z.infer<typeof registerSchema>;
