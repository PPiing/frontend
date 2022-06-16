import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticReadUsage } from "three";

export interface LoggedUserData {
  id: number;
  nick: string;
  img: string;
  status: number;
}

export const loggedUser = createSlice({
  name: "loggedUser",
  initialState: {
    id: 0,
    nick: "unknown",
    img: "/asset/profileImage/skim.png",
    status: 1
  } as LoggedUserData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setLoggedUser: (state, action: PayloadAction<LoggedUserData>) => state = action.payload,
    setLoggedUserStatus: (state, action: PayloadAction<LoggedUserData>) => {
      state.status = action.payload.status;
    },
  }
});

export const { setLoggedUser, setLoggedUserStatus } = loggedUser.actions;
export default loggedUser.reducer;
