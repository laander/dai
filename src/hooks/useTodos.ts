import { Todo } from "../types/Todo";
import createPersistedState from "use-persisted-state";
import { arrayMoveImmutable } from "array-move";
const useCounterState = createPersistedState("todos");

const generateId = (): number => Math.random() * 100000000000000000;

export default function useTodos() {
  const [todos, setTodos] = useCounterState<Todo[]>([]);

  const addNewTodo = (newTodo: string) => {
    setTodos((current) => [
      ...current,
      {
        id: generateId(),
        name: newTodo,
        done: false,
      },
    ]);
  };

  const toggleDone = (todoIndex: number) => {
    setTodos((current) =>
      current.map((todo, index) => {
        if (index === todoIndex) return { ...todo, done: !todo.done };
        return todo;
      })
    );
  };

  const remove = (todoIndex: number) => {
    setTodos((current) => current.filter((_, index) => index !== todoIndex));
  };

  const changeName = (todoIndex: number, text: string) => {
    setTodos((current) =>
      current.map((todo, index) => {
        if (index === todoIndex) return { ...todo, name: text };
        return todo;
      })
    );
  };

  const move = (todoIndex: number, direction: number) => {
    setTodos((current) => {
      return arrayMoveImmutable(current, todoIndex, todoIndex + direction);
    });
  };

  return [
    todos,
    { setTodos, addNewTodo, toggleDone, remove, changeName, move },
  ] as const;
}
