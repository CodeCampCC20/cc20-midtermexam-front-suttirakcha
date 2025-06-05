import { useState, type ChangeEvent, type FormEvent } from "react";
import FormInput from "./ui/FormInput";
import useTodoStore from "../stores/useTodoStore";
import useAuthStore from "../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoFields } from "../schemas/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function TodoForm() {
  const [todoValue, setTodoValue] = useState("");
  const userId = useAuthStore((state) => state.userId);
  const createTodo = useTodoStore((state) => state.createTodo);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      taskName: "",
      userId: userId,
    },
    resolver: zodResolver(todoSchema)
  });

  const onSubmit = (data: TodoFields) => {
    createTodo(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 w-full"
    >
      <div className="w-full">
        <FormInput
          {...register("taskName", {
            required: "Task name cannot be empty",
          })}
          errors={errors.taskName}
          value={todoValue}
          placeholder="New task"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodoValue(e.target.value)
          }
        />
      </div>
      <button disabled={isSubmitting} className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
