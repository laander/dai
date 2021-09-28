import Item from "./Item";
import { Box as LayoutBox, BoxProps, Flex } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { Todo } from "../types/Todo";

export const MotionBox = motion<BoxProps>(LayoutBox);
const springTransition = {
  type: "tween",
  duration: 0.2,
};

type ListProps = {
  todos: Todo[];
  focusedIndex: number;
  setFocus: (index: number) => void;
  toggleDone: (index: number) => void;
  changeName: (index: number, text: string) => void;
  remove: (index: number) => void;
};

export function List({
  todos,
  setFocus,
  focusedIndex,
  toggleDone,
  changeName,
  remove,
}: ListProps) {
  return (
    <Flex direction="column" my="4" width="100%">
      {todos.map((todo, index) => (
        <MotionBox key={todo.id} layout transition={springTransition as any}>
          <Item
            todoId={todo.id}
            todoName={todo.name}
            todoDone={todo.done}
            index={index}
            toggleDone={toggleDone}
            changeName={changeName}
            remove={remove}
            focus={setFocus}
            isFocused={focusedIndex === index}
          />
        </MotionBox>
      ))}
    </Flex>
  );
}
