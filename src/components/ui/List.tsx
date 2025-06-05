import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Checkbox from "./Checkbox";
import useTodoStore from "../../stores/useTodoStore";
import type { ListProps } from "../../types/types";
import { ArrowRight, Pencil, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import FormInput from "./FormInput";
import {
  updateTaskSchema,
  type UpdateTaskFields,
} from "../../schemas/updateTaskSchema";

function List({ id, title }: ListProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTaskName, setNewTaskName] = useState(title);
  const iconClassName = "w-5 h-5";
  const todos = useTodoStore((state) => state.todos);

  const initialValues: UpdateTaskFields = {
    taskName: todos.find((todo) => todo.id === id)?.taskName ?? "",
    completed: todos.find((todo) => todo.id === id)?.completed ?? false,
  };

  const { taskName, completed } = initialValues;

  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const { register, handleSubmit } = useForm<UpdateTaskFields>({
    defaultValues: initialValues,
    resolver: zodResolver(updateTaskSchema),
  });

  const notifyDelete = () => toast.success("Todo successfully deleted");
  const notifyUpdate = () => toast.success("Todo successfully updated");

  const handleDelete = (id: number) => {
    deleteTodo(id);
    notifyDelete();
  };

  const updateTask: SubmitHandler<UpdateTaskFields> = () => {
    setIsUpdating(false);
    updateTodo(id, { taskName: newTaskName, completed });
    notifyUpdate();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateTodo(id, {
              taskName: taskName,
              completed: completed === false ? e.target.checked : false,
            })
          }
        />
        {isUpdating ? (
          <form onSubmit={handleSubmit(updateTask)} className="w-full relative">
            <FormInput
              {...register("taskName", {
                value: newTaskName,
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTaskName(e.target.value)
              }
              className="text-sm w-full"
            />
            <button type="submit" className="absolute right-4 top-2">
              <ArrowRight />
            </button>
          </form>
        ) : (
          <p
            className={`text-sm ${
              completed ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="tooltip cursor-pointer" data-tip="Update">
          <Pencil
            onClick={() => setIsUpdating(!isUpdating)}
            className={iconClassName}
          />
        </div>
        <div className="tooltip cursor-pointer" data-tip="Delete">
          <X onClick={() => handleDelete(id)} className={iconClassName} />
        </div>
      </div>
    </div>
  );
}

export default List;
