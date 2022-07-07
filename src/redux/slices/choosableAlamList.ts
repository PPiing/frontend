import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type 0 = request add friend.
// type 1 = request game match.
export interface ChoosableAlamData {
  seq: string;
  from_seq: string;
  from_nick: string;
  type: number;
}

export const choosableAlamList = createSlice({
  name: "choosableAlamList",
  initialState: [
  ] as ChoosableAlamData[],
  reducers: {
    addChoosableAlam(state, action: PayloadAction<ChoosableAlamData>) {
      return [...state, action.payload];
    },
    clearChoosableAlamList(state, action: PayloadAction<ChoosableAlamData>) {
      state.splice(0);
    },
    removeChoosableAlam(state, action: PayloadAction<ChoosableAlamData>) {
      state.filter((value: ChoosableAlamData) => value.seq === action.payload.seq);
    }
  }
});

export const { addChoosableAlam,
  clearChoosableAlamList,
  removeChoosableAlam } = choosableAlamList.actions;
export default choosableAlamList.reducer;
