import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import loggedUser from "./slices/loggedUser";
import auth from "./slices/auth";

const reducer = combineReducers({
  users,
  loggedUser,
  auth
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
