import { type FieldErrors } from "react-hook-form";
import { type LoginFields } from "../schemas/loginSchema";
import { type RegisterFields } from "../schemas/registerSchema";
import type { TodoFields } from "../schemas/todoSchema";

export interface FormInputProps {
  label?: string;
  errors?: FieldErrors<T>,
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
  error?: string;
  createTodo: (data: TodoFields) => void;
  getTodos: () => void;
  updateTodo: (todoId: number) => void;
  deleteTodo: (todoId: number) => void;
}

export interface ListProps {
  id: number;
  title: string;
  isChecked: boolean;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}
