import { create } from "zustand";
import type { TodoState } from "../types/types";
import axios from "axios";
import type { TodoFields } from "../schemas/todoSchema";
import useAuthStore from "./useAuthStore";

const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  error: "",
  getTodos: () => {
    try {
      const accessToken = useAuthStore((state) => state.accessToken);
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) =>
          set(() => ({ todos: response.data.todos }))
        );
    } catch (err: any) {
      set(() => ({ error: err.message }));
    } finally {
      set(() => ({ error: "" }));
    }
    // set({ todos: response.data })
  },
  createTodo: (todo: TodoFields) => {
    try {
      const accessToken = useAuthStore((state) => state.accessToken);
      const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos`;
      axios.post(url, todo, {
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }).then(response => {
        set(() => ({ todos: [...response.data.todos, todo] }))
      })
      
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: (todoId: number) => {
    // set(() => ({ completed: true }))
  },
  deleteTodo: (todoId: number) => {
    const url = `http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2/todos/${todoId}`;
    axios
      .delete(url)
      .then((response) => console.log("Deleted successfully ", response.data))
      .catch((err) => console.log("Failed to delete ", err));
  },
}));
export default useTodoStore;
