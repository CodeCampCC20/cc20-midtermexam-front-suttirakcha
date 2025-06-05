import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import List from "../components/ui/List";
import useTodoStore from "../stores/useTodoStore";
import TodoForm from "../components/TodoForm";

function TodoPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const todos = useTodoStore((state) => state.todos);
  const getTodos = useTodoStore((state) => state.getTodos);
  const deleteTodo = useTodoStore(state => state.deleteTodo);

  useEffect(() => {
    if (todos){
      setIsLoading(false);
    }
    getTodos();
  }, [isLoading, isAuthenticated, getTodos, todos]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const content = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading...</p>;
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
                  isChecked={todo.completed}
                  onUpdate={() => console.log(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
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
      {content()}
    </main>
  );
}

export default TodoPage;
