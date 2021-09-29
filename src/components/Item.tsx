import { Input, Checkbox, Stack, useColorModeValue } from "@chakra-ui/react";
import { memo, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Box as LayoutBox, BoxProps } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { Keys } from "../constants/hotkeys";
export const MotionBox = motion<BoxProps>(LayoutBox);
const itemTransition = {
  type: "tween",
  duration: 0.2,
};

type ItemProps = {
  todoId: number;
  todoName: string;
  todoDone: boolean;
  index: number;
  isFocused: boolean;
  toggleDone: (index: number) => void;
  remove: (index: number) => void;
  changeName: (index: number, text: string) => void;
  setFocus: (index: number) => void;
};

const Todo = memo(function Todo({
  todoId,
  todoName,
  todoDone,
  index,
  toggleDone,
  remove,
  changeName,
  setFocus,
  isFocused,
}: ItemProps) {
  const ItemRef = useRef<HTMLDivElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    Keys.DELETE,
    () => {
      if (!isFocused) return;
      remove(todoId);
    },
    [todoId, isFocused, remove]
  );
  useHotkeys(
    Keys.EDIT,
    () => {
      if (!isFocused) return;
      if (InputRef.current === document.activeElement) {
        InputRef.current?.blur();
      } else {
        InputRef.current?.focus();
      }
    },
    {
      enableOnTags: ["INPUT"],
    },
    [InputRef, isFocused]
  );
  useHotkeys(
    Keys.TOGGLE_DONE,
    () => {
      if (!isFocused) return;
      toggleDone(todoId);
    },
    [todoId, isFocused, toggleDone]
  );
  useHotkeys(
    Keys.EXIT_EDIT,
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
    if (!isFocused) InputRef.current?.blur();
    if (isFocused && InputRef.current !== document.activeElement)
      ItemRef.current?.focus();
  }, [isFocused]);

  const itemBackground = useColorModeValue("gray.50", "gray.800");

  return (
    <MotionBox
      layout
      transition={itemTransition as any}
      ref={ItemRef}
      __css={{ _focus: { outline: "none" } }}
      tabIndex={index}
    >
      <Stack
        direction="row"
        px="2"
        py="2"
        background={isFocused ? itemBackground : ""}
        transitionProperty="background-color"
        transitionDuration="normal"
        borderRadius="md"
      >
        <Checkbox
          isChecked={todoDone}
          onChange={() => toggleDone(todoId)}
          onFocus={() => setFocus(index)}
          colorScheme="teal"
          size="lg"
          variant="round"
        ></Checkbox>
        <Input
          value={todoName}
          onChange={(e) => changeName(todoId, e.target.value)}
          onFocus={() => setFocus(index)}
          variant="unstyled"
          ref={InputRef}
          color={todoDone ? "gray.500" : ""}
        />
      </Stack>
    </MotionBox>
  );
});
export default Todo;
