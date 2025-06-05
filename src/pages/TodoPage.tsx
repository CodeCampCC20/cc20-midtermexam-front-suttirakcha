import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useEffect } from "react";
import List from "../components/ui/List";
import useTodoStore from "../stores/useTodoStore";
import TodoForm from "../components/TodoForm";
import Loading from "../components/Loading";

function TodoPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useTodoStore(state => state.isLoading);
  const todos = useTodoStore((state) => state.todos);
  const getTodos = useTodoStore((state) => state.getTodos);

  useEffect(() => {
    getTodos();
  }, [isLoading, todos]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const Content = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="space-y-2">
        <TodoForm />

        {todos.length > 0 ? (
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-4">
            {todos.map((todo) => {
              return (
                <List
                  id={todo.id}
                  key={todo.id}
                  title={todo.taskName}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No todos found. Please create a new one.
          </p>
        )}
      </div>
    );
  };

  return (
    <main className="main-sec">
      <h1 className="heading">My Todos</h1>
      <Content />
    </main>
  );
}

export default TodoPage;
