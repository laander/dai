import { List } from "./List";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import { useHotkeys } from "react-hotkeys-hook";
import useTodos from "../hooks/useTodos";
import New from "./New";
import { Keys } from "../constants/hotkeys";

function App() {
  const {
    todos,
    focusedIndex,
    toggleDone,
    changeName,
    remove,
    addNew,
    move,
    canUndo,
    canRedo,
    undo,
    redo,
    setFocus,
  } = useTodos();

  useHotkeys(
    Keys.NAVIGATE_UP,
    () => {
      focusedIndex > -1
        ? setFocus((currentIndex) => currentIndex - 1)
        : setFocus(todos.length - 1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus]
  );
  useHotkeys(
    Keys.NAVIGATE_DOWN,
    () => {
      focusedIndex < todos.length - 1
        ? setFocus((currentIndex) => currentIndex + 1)
        : setFocus(-1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus]
  );
  useHotkeys(
    Keys.MOVE_UP,
    () => {
      if (focusedIndex <= 0) return;
      move(focusedIndex, -1);
      setFocus((currentIndex) => currentIndex - 1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus, move]
  );
  useHotkeys(
    Keys.MOVE_DOWN,
    () => {
      if (focusedIndex === -1 || focusedIndex === todos.length - 1) return;
      move(focusedIndex, 1);
      setFocus((currentIndex) => currentIndex + 1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus, move]
  );

  return (
    <Grid
      templateRows="max-content auto max-content"
      width="100%"
      maxHeight="100vh"
    >
      <GridItem padding="2">
        <Header
          canUndo={canUndo}
          canRedo={canRedo}
          triggerUndo={undo}
          triggerRedo={redo}
        />
      </GridItem>
      <GridItem maxHeight="100%" __css={{ overflowY: "auto" }} marginX="2">
        <List
          todos={todos}
          focusedIndex={focusedIndex}
          setFocus={setFocus}
          toggleDone={toggleDone}
          changeName={changeName}
          remove={remove}
        />
      </GridItem>
      <GridItem padding="2">
        <New
          addNewTodo={addNew}
          focus={setFocus}
          isFocused={focusedIndex === -1}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
