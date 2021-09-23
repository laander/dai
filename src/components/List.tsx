import usePersistedState from "../hooks/usePersistedState";
import { Todo } from "../types/Todo";
import Item from "./Item";
import { New } from "./New";

export function List() {
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
  const changeName = (todoIndex: number, text: string) => {
    setTodos(
      todos.map((todo, index) => {
        if (index === todoIndex) return { ...todo, name: text };
        return todo;
      })
    );
  };
  return (
    <div className="w-4/5">
      <div className="flex flex-col max-h-96 overflow-auto">
        {todos.map((todo, index) => (
          <Item
            key={index}
            todo={todo}
            index={index}
            toggleDone={toggleDone}
            changeName={changeName}
          />
        ))}
      </div>
      <New addNewTodo={addNewTodo} />
    </div>
  );
}
