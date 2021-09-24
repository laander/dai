import { Input, Checkbox, Stack } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { Todo } from "../types/Todo";

type ItemProps = {
  todo: Todo;
  index: number;
  toggleDone: (index: number) => void;
  remove: (index: number) => void;
  changeName: (index: number, text: string) => void;
};

export default function Item({
  todo,
  index,
  toggleDone,
  remove,
  changeName,
}: ItemProps) {
  useHotkeys(
    "ctrl+d",
    () => {
      remove(index);
    },
    {
      enableOnTags: ["INPUT"],
    }
  );
  return (
    <Stack direction="row" px="1" tabindex={index}>
      <Checkbox
        isChecked={todo.done}
        onChange={() => toggleDone(index)}
        size="lg"
        variant="round"
      ></Checkbox>
      <Input
        value={todo.name}
        onChange={(e) => changeName(index, e.target.value)}
        variant="unstyled"
      />
    </Stack>
  );
}
