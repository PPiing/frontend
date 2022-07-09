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
    modifiyFriendStatus(state, action: PayloadAction<FriendData>) {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].seq === action.payload.seq) {
          state[i].status = action.payload.status;
          break;
        }
      }
    },
    removeFriendList(state, action: PayloadAction<FriendData>) {
      state.splice(0);
    },
  }
});

export const { addFriend, modifiyFriendStatus, removeFriendList } = friendList.actions;
export default friendList.reducer;
