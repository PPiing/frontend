import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DisplayData {
  searchSwitch: boolean;
  searchString: string;
  searchRetRec: boolean;
  chatRoomId: number;
}

export const display = createSlice({
  name: "display",
  initialState: {
    searchSwitch: false,
    searchString: "",
    searchRetRec: false,
    chatRoomId: -1,
  } as DisplayData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setSearchSwitch: (state, action: PayloadAction<DisplayData>) => {
      state.searchSwitch = action.payload.searchSwitch;
    },
    setSearchString: (state, action: PayloadAction<DisplayData>) => {
      state.searchString = action.payload.searchString;
    },
    setSearchRetRec: (state, action: PayloadAction<DisplayData>) => {
      state.searchRetRec = action.payload.searchRetRec;
    },
    setChatRoomId: (state, action: PayloadAction<DisplayData>) => {
      state.chatRoomId = action.payload.chatRoomId;
    },
  }
});

export const {
  setSearchSwitch,
  setSearchString,
  setSearchRetRec,
  setChatRoomId } = display.actions;
export default display.reducer;
