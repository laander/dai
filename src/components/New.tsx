import { Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type NewProps = {
  addNewTodo: (text: string) => void;
  focus: (e: any) => void;
  isFocused: boolean;
};

export function New({ addNewTodo, focus, isFocused }: NewProps) {
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useHotkeys(
    "n",
    (e) => {
      e.preventDefault();
      inputRef?.current?.focus();
    },
    [inputRef]
  );
  useEffect(() => {
    isFocused ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isFocused]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current?.value === "") return;
        addNewTodo(newTodo);
        setNewTodo("");
      }}
    >
      <Input
        ref={inputRef}
        placeholder="Add new todo"
        value={newTodo}
        onFocus={focus}
        onChange={(e) => setNewTodo(e.target.value)}
        focusBorderColor="teal.400"
      />
    </form>
  );
}
