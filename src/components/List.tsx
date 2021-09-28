import Item from "./Item";
import { Flex } from "@chakra-ui/layout";
import { Todo } from "../types/Todo";

type ListProps = {
  todos: Todo[];
  focusedIndex: number;
  setFocus: (index: number) => void;
  toggleDone: (index: number) => void;
  changeName: (index: number, text: string) => void;
  remove: (index: number) => void;
};

export function List(props: ListProps) {
  const { todos, focusedIndex, ...rest } = props;
  return (
    <Flex direction="column" my="4" width="100%">
      {todos.map((todo, index) => (
        <Item
          key={todo.id}
          todoId={todo.id}
          todoName={todo.name}
          todoDone={todo.done}
          index={index}
          isFocused={focusedIndex === index}
          {...rest}
        />
      ))}
    </Flex>
  );
}
