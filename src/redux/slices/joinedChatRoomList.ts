import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CHTP10        개인 채팅방 (DM)
// CHTP20        단체 채팅방 (public)
// CHTP30        단체 채팅방 (protected)
// CHTP40        비밀 채팅방 (private)
type chatType = "CHTP10" | "CHTP20" | "CHTP30" | "CHTP40";

export interface JoinedChatRoomListData {
  seq: number;
  type: chatType;
  name: string;
}

export const joinedChatRoomList = createSlice({
  name: "joinedChatRoomList",
  initialState: [] as JoinedChatRoomListData[],
  reducers: {
    addJoinedChatRoom(state, action: PayloadAction<JoinedChatRoomListData>) {
      if (state.indexOf(action.payload) === -1) return [...state, action.payload];
      return state;
    },
    removeJoinedChatRoomList(state, action: PayloadAction<JoinedChatRoomListData>) {
      state.splice(0);
    },
  }
});

export const { addJoinedChatRoom, removeJoinedChatRoomList } = joinedChatRoomList.actions;
export default joinedChatRoomList.reducer;
