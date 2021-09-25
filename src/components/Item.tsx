import { Input, Checkbox, Stack, Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Todo } from "../types/Todo";

type ItemProps = {
  todo: Todo;
  index: number;
  toggleDone: (index: number) => void;
  remove: (index: number) => void;
  changeName: (index: number, text: string) => void;
  focus: (index: number) => void;
  isFocused: boolean;
};

export default function Item({
  todo,
  index,
  toggleDone,
  remove,
  changeName,
  focus,
  isFocused,
}: ItemProps) {
  const ItemRef = useRef<HTMLInputElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    "backspace",
    () => {
      if (!isFocused) return;
      remove(index);
    },
    [index, isFocused, remove]
  );
  useHotkeys(
    "enter",
    () => {
      if (!isFocused) return;
      InputRef.current?.focus();
    },
    {
      enableOnTags: ["INPUT"],
    },
    [InputRef, isFocused]
  );
  useHotkeys(
    "space",
    () => {
      if (!isFocused) return;
      toggleDone(index);
    },
    [index, isFocused, toggleDone]
  );
  useHotkeys(
    "esc",
    () => {
      if (!isFocused) return;
      InputRef.current?.blur();
    },
    {
      enableOnTags: ["INPUT"],
    },
    [InputRef, isFocused]
  );

  useEffect(() => {
    !isFocused && InputRef.current?.blur();
    isFocused && ItemRef.current?.focus();
  }, [isFocused]);

  return (
    <Box
      ref={ItemRef}
      __css={
        { _focus: { outline: "none" } } // removes gap between children?
      }
      tabIndex={index}
    >
      <Stack
        direction="row"
        px="2"
        py="2"
        background={isFocused ? "gray.800" : ""}
        borderRadius="md"
      >
        <Checkbox
          isChecked={todo.done}
          onChange={() => toggleDone(index)}
          onFocus={() => focus(index)}
          size="lg"
          variant="round"
        ></Checkbox>
        <Input
          value={todo.name}
          onChange={(e) => changeName(index, e.target.value)}
          onFocus={() => focus(index)}
          variant="unstyled"
          ref={InputRef}
          color={todo.done ? "gray.500" : ""}
        />
      </Stack>
    </Box>
  );
}
