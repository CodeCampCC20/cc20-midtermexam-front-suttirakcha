import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import LoginPage from "./pages/LoginPage"
import useAuthStore from "./stores/useAuthStore"
import TodoPage from "./pages/TodoPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={isAuthenticated ? "todos" : "login"} />} />
          <Route path="todos" element={<TodoPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
