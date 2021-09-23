import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function New(props: { addNewTodo: Function }) {
  const [newTodo, setNewTodo] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);
  useHotkeys(
    "ctrl+n",
    () => {
      inputEl?.current?.focus();
    },
    {
      enableOnTags: ["INPUT"],
    }
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.addNewTodo(newTodo);
        setNewTodo("");
      }}
    >
      <input
        ref={inputEl}
        type="text"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="text-gray-900"
      />
    </form>
  );
}
