import { Input } from "@chakra-ui/react";
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
      <Input
        ref={inputEl}
        placeholder="Add new todo"
        value={newTodo}
        onChange={(e) =>
          e.target.value !== "" ? setNewTodo(e.target.value) : undefined
        }
      />
    </form>
  );
}
