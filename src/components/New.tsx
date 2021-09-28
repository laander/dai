import { Input } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Keys } from "../constants/hotkeys";

type NewProps = {
  addNewTodo: (text: string) => void;
  focus: (e: any) => void;
  isFocused: boolean;
};

const New = memo(function New({ addNewTodo, focus, isFocused }: NewProps) {
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    Keys.NEW,
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
        onFocus={() => focus(-1)}
        onChange={(e) => setNewTodo(e.target.value)}
        focusBorderColor="teal.400"
      />
    </form>
  );
});

export default New;
