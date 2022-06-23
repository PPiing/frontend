import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoggedUserData {
  nick: string;
  mail: string;
  img: string;
  status: string;
}

export const loggedUser = createSlice({
  name: "loggedUser",
  initialState: {
    nick: "unknown",
    mail: "unknown@unknown.com",
    img: "/asset/profileImage/default.png",
    status: "USST10"
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
