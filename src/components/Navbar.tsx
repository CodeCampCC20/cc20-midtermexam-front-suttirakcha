import { NavLink } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="flex items-center h-16 justify-between p-6 bg-indigo-300">
      <h1 className="text-2xl">Welcome to Todolist</h1>
      {!isAuthenticated ? (
        <nav className="flex items-center gap-4">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      ) : (
        <nav>
          <button onClick={logout} className="cursor-pointer">Logout</button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
