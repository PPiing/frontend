import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type 0 = request add friend.
// type 1 = request game match.
export interface ChoosableAlamData {
  type: number;
  from: string;
}

export const choosableAlamList = createSlice({
  name: "choosableAlamList",
  initialState: [
    { type: 0, from: "sample1" },
    { type: 1, from: "sample2a" },
    { type: 0, from: "sample3aa" },
    { type: 1, from: "sample4a" },
    { type: 0, from: "sample5" },
  ] as ChoosableAlamData[],
  reducers: {
    addChoosableAlam(state, action: PayloadAction<ChoosableAlamData>) {
      return [...state, action.payload];
    }
  }
});

export const { addChoosableAlam } = choosableAlamList.actions;
export default choosableAlamList.reducer;
