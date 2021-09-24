import { Todo } from "../types/Todo";
import usePersistedState from "./usePersistedState";

export default function useTodos() {
  const [todos, setTodos] = usePersistedState<Todo[]>("todos", [
    { name: "hi!", done: false },
  ]);

  const addNewTodo = (newTodo: string) => {
    setTodos([...todos, { name: newTodo, done: false }]);
  };

  const toggleDone = (todoIndex: number) => {
    setTodos(
      todos.map((todo, index) => {
        if (index === todoIndex) return { ...todo, done: !todo.done };
        return todo;
      })
    );
  };

  const remove = (todoIndex: number) => {
    setTodos(todos.filter((_, index) => index !== todoIndex));
  };

  const changeName = (todoIndex: number, text: string) => {
    setTodos(
      todos.map((todo, index) => {
        if (index === todoIndex) return { ...todo, name: text };
        return todo;
      })
    );
  };

  return [todos, { addNewTodo, toggleDone, remove, changeName }] as const;
}
