import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FriendData {
  seq: string;
  nick: string;
  img: string;
  status: string;
}

export const friendList = createSlice({
  name: "friendList",
  initialState: [
  ] as FriendData[],
  reducers: {
    addFriend(state, action: PayloadAction<FriendData>) {
      return [...state, action.payload];
    },
    removeFriendList(state, action: PayloadAction<FriendData>) {
      state.splice(0);
    },
  }
});

export const { addFriend, removeFriendList } = friendList.actions;
export default friendList.reducer;
