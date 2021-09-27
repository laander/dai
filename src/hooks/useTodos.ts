import { Todo } from "../types/Todo";
import usePersistedState from "./usePersistedState";
import { arrayMoveImmutable } from "array-move";
import { useCallback, useEffect, useMemo, useState } from "react";

const generateId = (): number => Math.random() * 100000000000000000;

export default function useTodos() {
  const [current, { set, canRedo, canUndo, undo, redo, reset }] =
    usePersistedState<Todo[]>("todos", []);
  const [focusedIndex, setFocus] = useState(-1);

  const addNewTodo = useCallback(
    (newTodo: string) => {
      set((current) => [
        ...current,
        {
          id: generateId(),
          name: newTodo,
          done: false,
        },
      ]);
    },
    [set]
  );

  const toggleDone = useCallback(
    (todoId: number) => {
      set((current) =>
        current.map((todo) => {
          if (todo.id === todoId) return { ...todo, done: !todo.done };
          return todo;
        })
      );
    },
    [set]
  );

  const remove = useCallback(
    (todoId: number) => {
      set((current) => current.filter((todo) => todo.id !== todoId));
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
    (todoId: number, direction: number) => {
      set((current) => {
        const index = current.findIndex((todo) => todo.id === todoId);
        return arrayMoveImmutable(current, index, index + direction);
      });
    },
    [set]
  );

  useEffect(() => {
    console.log("sumthing changes");
  }, [changeName]);

  const sortedTodos = useMemo(
    () => [...current].sort((t1) => (t1.done ? 1 : -1)),
    [current]
  );

  return [
    { todos: sortedTodos, focusedIndex },
    {
      setTodos: set,
      addNewTodo,
      toggleDone,
      remove,
      changeName,
      move,
      canRedo,
      canUndo,
      undo,
      redo,
      reset,
      setFocus,
    },
  ] as const;
}
