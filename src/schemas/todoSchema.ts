import { z } from "zod";

export const todoSchema = z.object({
  taskName: z.string({ message: "Task name cannot be empty" }),
  userId: z.number()
})

export type TodoFields = z.infer<typeof todoSchema>;