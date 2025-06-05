import { type FieldErrors } from "react-hook-form";
import { type LoginFields } from "../schemas/loginSchema";
import { type RegisterFields } from "../schemas/registerSchema";
import { type TodoFields } from "../schemas/todoSchema";
import { type UpdateTaskFields } from "../schemas/updateTaskSchema";

export interface FormInputProps {
  label?: string;
  errors?: FieldErrors<T>;
  className?: string;
  [props: string]: any
}

export interface AuthState {
  user: unknown;
  isAuthenticated: boolean;
  accessToken?: string;
  userId: any;
  error?: string;
  login: (input: LoginFields) => void;
  register: (input: RegisterFields) => void;
  logout: () => void;
}

export interface Todo extends TodoFields {
  id: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  createTodo: (data: TodoFields) => void;
  getTodos: () => Promise<void>;
  updateTodo: (todoId: number, { taskName, completed } : UpdateTaskFields) => void;
  deleteTodo: (todoId: number) => void;
}

export interface ListProps {
  id: number;
  title: string;
}