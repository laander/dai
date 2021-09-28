import { Input, Checkbox, Stack, Box } from "@chakra-ui/react";
import { memo, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type ItemProps = {
  todoId: number;
  todoName: string;
  todoDone: boolean;
  index: number;
  toggleDone: (index: number) => void;
  remove: (index: number) => void;
  changeName: (index: number, text: string) => void;
  focus: (index: number) => void;
  isFocused: boolean;
};

const Todo = memo(function Todo({
  todoId,
  todoName,
  todoDone,
  index,
  toggleDone,
  remove,
  changeName,
  focus,
  isFocused,
}: ItemProps) {
  const ItemRef = useRef<HTMLDivElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    "backspace",
    () => {
      if (!isFocused) return;
      remove(todoId);
    },
    [todoId, isFocused, remove]
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
      toggleDone(todoId);
    },
    [todoId, isFocused, toggleDone]
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
          isChecked={todoDone}
          onChange={() => toggleDone(todoId)}
          onFocus={() => focus(index)}
          colorScheme="teal"
          size="lg"
          variant="round"
        ></Checkbox>
        <Input
          value={todoName}
          onChange={(e) => changeName(todoId, e.target.value)}
          onFocus={() => focus(index)}
          variant="unstyled"
          ref={InputRef}
          color={todoDone ? "gray.500" : ""}
        />
      </Stack>
    </Box>
  );
});
export default Todo;
