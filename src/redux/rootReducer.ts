import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import loggedUser from "./slices/loggedUser";

const reducer = combineReducers({
  users,
  loggedUser
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
