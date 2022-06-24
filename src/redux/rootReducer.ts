import { combineReducers } from "@reduxjs/toolkit";
import friendList from "./slices/friendList";
import choosableAlamList from "./slices/choosableAlamList";
import loggedUser from "./slices/loggedUser";
import auth from "./slices/auth";
import display from "./slices/display";

const reducer = combineReducers({
  friendList,
  choosableAlamList,
  loggedUser,
  auth,
  display
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
