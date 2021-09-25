import { Box, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useTodos from "../hooks/useTodos";
import Item from "./Item";
import { New } from "./New";

import { Box as LayoutBox, BoxProps } from "@chakra-ui/layout";
import { motion } from "framer-motion";

export const MotionBox = motion<BoxProps>(LayoutBox);
const springTransition = {
  type: "tween",
  duration: 0.2,
};

export function List() {
  const [focusedIndex, setFocus] = useState(-1);
  const [todos, actions] = useTodos();

  useHotkeys(
    "up",
    () => {
      focusedIndex > -1
        ? setFocus((currentIndex) => currentIndex - 1)
        : setFocus(todos.length - 1);
    },
    {
      enableOnTags: ["INPUT"],
    }
  );
  useHotkeys(
    "down",
    () => {
      focusedIndex < todos.length - 1
        ? setFocus((currentIndex) => currentIndex + 1)
        : setFocus(-1);
    },
    {
      enableOnTags: ["INPUT"],
    }
  );
  useHotkeys(
    "alt+up",
    () => {
      if (focusedIndex === 0) return;
      actions.move(focusedIndex, -1);
      setFocus((currentIndex) => currentIndex - 1);
    },
    {
      enableOnTags: ["INPUT"],
    }
  );
  useHotkeys(
    "alt+down",
    () => {
      if (focusedIndex === todos.length - 1) return;
      actions.move(focusedIndex, 1);
      setFocus((currentIndex) => currentIndex + 1);
    },
    {
      enableOnTags: ["INPUT"],
    }
  );

  const sortedTodos = useMemo(
    () => todos.sort((t1) => (t1.done ? 1 : -1)),
    [todos]
  );

  return (
    <Box>
      <Stack maxH="96" overflowY="scroll" my="4">
        {sortedTodos.map((todo, index) => (
          <MotionBox key={todo.id} layout transition={springTransition as any}>
            <Item
              todo={todo}
              index={index}
              toggleDone={actions.toggleDone}
              changeName={actions.changeName}
              remove={actions.remove}
              focus={setFocus}
              isFocused={focusedIndex === index}
            />
          </MotionBox>
        ))}
      </Stack>
      <New
        addNewTodo={actions.addNewTodo}
        focus={() => setFocus(-1)}
        isFocused={focusedIndex === -1}
      />
    </Box>
  );
}
