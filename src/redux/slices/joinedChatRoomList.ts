import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CHTP10        개인 채팅방 (DM)
// CHTP20        단체 채팅방 (public)
// CHTP30        단체 채팅방 (protected)
// CHTP40        비밀 채팅방 (private)
type chatType = "CHTP10" | "CHTP20" | "CHTP30" | "CHTP40";

export interface JoinedChatRoomListData {
  seq: string;
  type: string;
  name: string;
}

export const joinedChatRoomList = createSlice({
  name: "joinedChatRoomList",
  initialState: [
    { seq: "1", type: "CHTP10", name: "abc123" },
    { seq: "5", type: "CHTP40", name: "abc1234" },
    { seq: "3", type: "CHTP30", name: "abc12345" },
    { seq: "7", type: "CHTP20", name: "abc123456" },
  ] as JoinedChatRoomListData[],
  reducers: {
    addJoinedChatRoom(state, action: PayloadAction<JoinedChatRoomListData>) {
      return [...state, action.payload];
    },
    removeJoinedChatRoomList(state, action: PayloadAction<JoinedChatRoomListData>) {
      state.splice(0);
    },
  }
});

export const { addJoinedChatRoom, removeJoinedChatRoomList } = joinedChatRoomList.actions;
export default joinedChatRoomList.reducer;
