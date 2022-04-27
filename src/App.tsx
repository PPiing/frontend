import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavUp from "./component/NavUp";
import NavRight from "./containers/NavRight";

function App() {
  return (
    <div className="App">
      <NavUp />
      <NavRight />
    </div>
  );
}

export default App;
