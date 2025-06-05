import axios from "axios";
import { create } from "zustand";
import type { TodoState } from "../types/types";
import type { TodoFields } from "../schemas/todoSchema";
import useAuthStore from "./useAuthStore";
import type { UpdateTaskFields } from "../schemas/updateTaskSchema";

const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  isLoading: true,
  error: "",
  getTodos: async () => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      const token = useAuthStore.getState().accessToken;
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      set(() => ({ isLoading: false, todos: response.data.todos }));
      return response.data.todos;
    } catch (err: any) {
      set(() => ({ error: err.message }));
    } finally {
      set(() => ({ error: "" }));
    }
  },
  createTodo: async (todo: TodoFields) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      const token = useAuthStore.getState().accessToken;
      const response = await axios.post(url, todo, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      set(() => ({ todos: [...response.data.todos, todo] }));
      return response.data.todos;
    } catch (err) {
      console.log(err);
    } finally {
      useTodoStore.getState().getTodos();
      return;
    }
  },
  updateTodo: async (
    todoId: number,
    { taskName, completed }: UpdateTaskFields
  ) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos/${todoId}`;
      const token = useAuthStore.getState().accessToken;
      await axios.patch(
        url,
        { taskName, completed },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      useTodoStore.getState().getTodos();
      return;
    }
  },
  deleteTodo: async (todoId: number) => {
    try {
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos/${todoId}`;
      const token = useAuthStore.getState().accessToken;
      const response = await axios.delete(url, {
        data: { id: todoId },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log("Deleted successfully ", response.data);
    } catch (err: any) {
      console.log("Failed to delete ", err.message);
    } finally {
      useTodoStore.getState().getTodos();
      return;
    }
  },
}));

export default useTodoStore;
