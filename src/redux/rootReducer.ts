import { combineReducers } from "@reduxjs/toolkit";
import friendList from "./slices/friendList";
import choosableAlamList from "./slices/choosableAlamList";
import commonAlamList from "./slices/commonAlam";
import loggedUser from "./slices/loggedUser";
import auth from "./slices/auth";
import display from "./slices/display";
import gameRule from "./slices/gameRule"
import joinedChatRoomList from "./slices/joinedChatRoomList";
import blockList from "./slices/blockList";

const reducer = combineReducers({
  friendList,
  choosableAlamList,
  joinedChatRoomList,
  commonAlamList,
  loggedUser,
  auth,
  display,
  gameRule,
  blockList
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
