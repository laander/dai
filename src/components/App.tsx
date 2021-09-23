import React from "react";
import "./App.css";
import { List } from "./List";

function App() {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center h-screen">
      <header className="">
        <h1>Todos</h1>
      </header>
      <List />
    </div>
  );
}

export default App;
