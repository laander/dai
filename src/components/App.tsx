import "./App.css";
import { List } from "./List";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import theme from "../theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg" marginTop="4">
        <header className="">
          <Heading>Todos</Heading>
        </header>
        <List />
      </Container>
    </ChakraProvider>
  );
}

export default App;
