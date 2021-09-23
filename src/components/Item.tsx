import { Todo } from "../types/Todo";

type ItemProps = {
  todo: Todo;
  index: number;
  toggleDone: (index: number) => void;
  changeName: (index: number, text: string) => void;
};

export default function Item({
  todo,
  index,
  toggleDone,
  changeName,
}: ItemProps) {
  return (
    <div className="p-3 flex space-x-3 items-center">
      <input
        id={"todo-" + index}
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(index)}
        className="object-cover"
      />
      <input
        type="text"
        value={todo.name}
        className="bg-transparent"
        onChange={(e) => changeName(index, e.target.value)}
      />
      {/* <label htmlFor={"todo-" + index}></label> */}
    </div>
  );
}
