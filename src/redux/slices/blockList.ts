import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlockData {
  seq: string;
}

export const blockList = createSlice({
  name: "blockList",
  initialState: [
  ] as BlockData[],
  reducers: {
    addBlockUser(state, action: PayloadAction<BlockData>) {
      return [...state, action.payload];
    },
    clearBlockList(state, action: PayloadAction<BlockData>) {
      state.splice(0);
    }
  }
});

export const { addBlockUser, clearBlockList } = blockList.actions;
export default blockList.reducer;
