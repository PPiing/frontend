import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import loggedUser from "./slices/loggedUser";
import auth from "./slices/auth";
import display from "./slices/display";

const reducer = combineReducers({
  users,
  loggedUser,
  auth,
  display
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
