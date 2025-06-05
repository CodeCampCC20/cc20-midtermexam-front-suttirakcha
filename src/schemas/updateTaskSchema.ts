import { z } from "zod";

export const updateTaskSchema = z.object({
  taskName: z.string(),
  completed: z.boolean()
})

export type UpdateTaskFields = z.infer<typeof updateTaskSchema>;