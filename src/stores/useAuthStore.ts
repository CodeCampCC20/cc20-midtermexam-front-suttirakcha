import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginFields } from "../schemas/loginSchema";
import axios from "axios";
import type { AuthState } from "../types/types";
import type { RegisterFields } from "../schemas/registerSchema";
import useTodoStore from "./useTodoStore";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: "",
      userId: null,
      error: "",
      login: async (data: LoginFields) => {
        try {
          const url =
            "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V1/auth/login";

          const response = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            set(() => ({
              user: data,
              isAuthenticated: response.data.login,
              accessToken: response.data.accessToken,
              userId: response.data.userId,
            }));
          }
        } catch (err: any) {
          set(() => ({ error: err.message }));
        }
      },
      register: async (data: RegisterFields) => {
        try {
          const url =
            "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V1/auth/register";

          const response = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(response.data.message);
        } catch (err: any) {
          set(() => ({ error: err.message }));
        }
      },
      logout: () => {
        set(() => ({ user: null, accessToken: "", userId: null, isAuthenticated: false }));
        useTodoStore.setState(() => ({ todos: [] }))
      },
    }),
    {
      name: "auth-user",
    }
  )
);

export default useAuthStore;
