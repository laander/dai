import { Box, Stack } from "@chakra-ui/react";
import useTodos from "../hooks/useTodos";
import Item from "./Item";
import { New } from "./New";

export function List() {
  const [todos, actions] = useTodos();

  return (
    <Box>
      <Stack maxH="96" overflowY="scroll" my="4">
        {todos.map((todo, index) => (
          <Item
            key={index}
            todo={todo}
            index={index}
            toggleDone={actions.toggleDone}
            changeName={actions.changeName}
            remove={actions.remove}
          />
        ))}
      </Stack>
      <New addNewTodo={actions.addNewTodo} />
    </Box>
  );
}
