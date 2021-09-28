import { Todo } from "../types/Todo";
import usePersistedState from "./usePersistedState";
import { arrayMoveImmutable } from "array-move";
import { useCallback, useEffect, useState } from "react";
import defaultTodos from "../constants/defaultTodos.json";
import useUndo from "./useUndo";

const generateId = (): number => Math.random() * 100000000000000000;
const sortTodos = (todos: Todo[]) =>
  [...todos].sort((t1, t2) => {
    return t1.done === t2.done ? 0 : t1.done ? 1 : -1;
  });

export default function useTodos() {
  const [focusedIndex, setFocus] = useState(-1);

  const {
    present: todos,
    reset,
    canUndo,
    canRedo,
    redo,
    undo,
    set,
  } = useUndo<Todo[]>([]);

  const [initialValue] = usePersistedState<Todo[]>(
    "todos",
    defaultTodos,
    todos
  );

  useEffect(() => {
    // set initial todos from either localstorage or default fallback
    reset(initialValue());
  }, [reset, initialValue]);

  const addNew = useCallback(
    (newTodo: string) => {
      set((current) =>
        sortTodos([
          ...current,
          {
            id: generateId(),
            name: newTodo,
            done: false,
          },
        ])
      );
    },
    [set]
  );

  const toggleDone = useCallback(
    (todoId: number) => {
      set((current) =>
        sortTodos(
          current.map((todo) => {
            if (todo.id === todoId) return { ...todo, done: !todo.done };
            return todo;
          })
        )
      );
    },
    [set]
  );

  const remove = useCallback(
    (todoId: number) => {
      set((current) => sortTodos(current.filter((todo) => todo.id !== todoId)));
    },
    [set]
  );

  const changeName = useCallback(
    (todoId: number, text: string) => {
      set((current) =>
        current.map((todo) => {
          if (todo.id === todoId) return { ...todo, name: text };
          return todo;
        })
      );
    },
    [set]
  );

  const move = useCallback(
    (focusedIndex: number, direction: number) => {
      set((current) => {
        return sortTodos(
          arrayMoveImmutable(current, focusedIndex, focusedIndex + direction)
        );
      });
    },
    [set]
  );

  return {
    todos,
    focusedIndex,
    addNew,
    toggleDone,
    remove,
    changeName,
    move,
    canRedo,
    canUndo,
    undo,
    redo,
    setFocus,
  };
}
