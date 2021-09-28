import { List } from "./List";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import theme from "../theme";
import Header from "./Header";
import { useHotkeys } from "react-hotkeys-hook";
import useTodos from "../hooks/useTodos";
import { New } from "./New";

function App() {
  const [
    { todos, focusedIndex },
    {
      toggleDone,
      changeName,
      remove,
      addNewTodo,
      move,
      canUndo,
      canRedo,
      undo,
      redo,
      setFocus,
    },
  ] = useTodos();

  useHotkeys(
    "up",
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
    "down",
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
    "alt+up",
    () => {
      if (focusedIndex === 0) return;
      move(focusedIndex, -1);
      setFocus((currentIndex) => currentIndex - 1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus, move]
  );
  useHotkeys(
    "alt+down",
    () => {
      if (focusedIndex === todos.length - 1) return;
      move(focusedIndex, 1);
      setFocus((currentIndex) => currentIndex + 1);
    },
    {
      enableOnTags: ["INPUT"],
    },
    [setFocus, move]
  );

  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateRows="max-content auto max-content"
        width="100%"
        maxHeight="100vh"
        padding="2"
      >
        <GridItem>
          <Header
            canUndo={canUndo}
            canRedo={canRedo}
            triggerUndo={undo}
            triggerRedo={redo}
          />
        </GridItem>
        <GridItem maxHeight="100%" __css={{ overflowY: "auto" }}>
          <List
            sortedTodos={todos}
            focusedIndex={focusedIndex}
            setFocus={setFocus}
            toggleDone={toggleDone}
            changeName={changeName}
            remove={remove}
          />
        </GridItem>
        <GridItem>
          <New
            addNewTodo={addNewTodo}
            focus={() => setFocus(-1)}
            isFocused={focusedIndex === -1}
          />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
