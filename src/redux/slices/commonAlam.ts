import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonAlamData {
  seq: string;
  from_seq: string;
  from_nick: string;
  type: string;
  code: string;
}

export const commonAlamList = createSlice({
  name: "commonAlamList",
  initialState: [
  ] as CommonAlamData[],
  reducers: {
    addCommonAlam(state, action: PayloadAction<CommonAlamData>) {
      return [...state, action.payload];
    },
    clearCommonAlamList(state, action: PayloadAction<CommonAlamData>) {
      state.splice(0);
    },
    removeCommonAlam(state, action: PayloadAction<CommonAlamData>) {
      state.filter((value: CommonAlamData) => value.seq === action.payload.seq);
    }
  }
});

export const { addCommonAlam, clearCommonAlamList, removeCommonAlam } = commonAlamList.actions;
export default commonAlamList.reducer;
