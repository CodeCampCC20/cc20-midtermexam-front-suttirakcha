import axios from "axios";
import { create } from "zustand";
import type { TodoState } from "../types/types";
import type { TodoFields } from "../schemas/todoSchema";
import useAuthStore from "./useAuthStore";
import type { UpdateTaskFields } from "../schemas/updateTaskSchema";

const getToken = () => {
  const token = useAuthStore.getState().accessToken;
  return token;
}

const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  isLoading: true,
  getTodos: async () => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      set(() => ({ isLoading: false, todos: response.data.todos }));
    } catch (err: any) {
      console.log(err.message);
    }
  },
  createTodo: async (todo: TodoFields) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      const response = await axios.post(url, todo, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });

      set(() => ({ todos: [...response.data.todos, todo] }));
      return;
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (
    todoId: number,
    { taskName, completed }: UpdateTaskFields
  ) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos/${todoId}`;
      await axios.patch(
        url,
        { taskName, completed },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (todoId: number) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos/${todoId}`;
      const response = await axios.delete(url, {
        data: { id: todoId },
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });

      console.log("Deleted successfully ", response.data);
    } catch (err: any) {
      console.log("Failed to delete ", err.message);
    }
  },
}));

export default useTodoStore;
