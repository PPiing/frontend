import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStyles } from "./theme/theme";
import { Home } from "./view/viewHome";
import { Game } from "./view/viewGame";
import { Chat } from "./view/viewChat";
import { Profile } from "./view/viewProfile";
import { Watch } from "./view/viewWatch";
import { Login } from "./view/viewLogin";
import store from "./redux/store";

function App() {
  globalStyles();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
