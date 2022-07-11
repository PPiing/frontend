import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameRuleData {
    score: Number;
    speed: Number;
    size: Number;
    isRankGame: Boolean;
};

export const gameRule = createSlice({
  name: "gamerule",
  initialState: {
    score: 3,
    speed: 1,
    size: 0,
    isRankGame: false,
  } as GameRuleData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setGameRuleData: (state, action: PayloadAction<GameRuleData>) => state = action.payload,
    setIsRankGame: (state, action: PayloadAction<GameRuleData>) => {
      state.isRankGame = action.payload.isRankGame;
    }
  }
});

export const { setGameRuleData, setIsRankGame } = gameRule.actions;
export default gameRule.reducer;
