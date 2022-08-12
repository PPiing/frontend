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
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].seq === action.payload.seq) {
          state.splice(i, 1);
          break;
        }
      }
    },
    removeOverlapChoosableAlam(state, action: PayloadAction<ChoosableAlamData>) {
      state = state.filter((v, i) => state.indexOf(v) === i);
    }
  }
});

export const { addChoosableAlam,
  clearChoosableAlamList,
  removeChoosableAlam,
  removeOverlapChoosableAlam } = choosableAlamList.actions;
export default choosableAlamList.reducer;
