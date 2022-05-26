import React from "react";
import { } from "react-router-dom";
import { globalStyles } from "./theme/theme";
import { Home } from "./view/home";

function App() {
  globalStyles();
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
