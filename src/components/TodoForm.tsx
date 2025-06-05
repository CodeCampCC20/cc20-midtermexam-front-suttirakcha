import { useState, type ChangeEvent } from "react";
import FormInput from "./ui/FormInput";
import useTodoStore from "../stores/useTodoStore";
import useAuthStore from "../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoFields } from "../schemas/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";

function TodoForm() {
  const [todoValue, setTodoValue] = useState("");
  const userId = useAuthStore((state) => state.userId);
  const createTodo = useTodoStore((state) => state.createTodo);
  const getTodos = useTodoStore((state) => state.getTodos);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      taskName: "",
      userId: userId,
    },
    resolver: zodResolver(todoSchema),
  });

  const notify = () => toast.success("Todo successfully created");

  const onSubmit = async (data: TodoFields) => {
    createTodo(data);
    notify();
    await getTodos();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 flex-1"
      >
        <div className="w-full">
          <FormInput
            {...register("taskName", {
              required: "Task name cannot be empty",
              value: todoValue
            })}
            errors={errors.taskName}
            placeholder="New task"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodoValue(e.target.value)
            }
          />
        </div>
        <button
          disabled={isSubmitting}
          className="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default TodoForm;
