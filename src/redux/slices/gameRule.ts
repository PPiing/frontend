import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameRuleData {
    matchScore: number;
    ballSpeed: number;
    paddleSize: number;
    isRankGame: boolean;
    isInGame: boolean;
    blueUser: string;
    redUser: string;
    blueScore: number;
    redScore: number;
};

export const gameRule = createSlice({
  name: "gamerule",
  initialState: {
    matchScore: 3,
    ballSpeed: 1.0,
    paddleSize: 1.0,
    isRankGame: true,
    isInGame: false,
    blueUser: "",
    redUser: "",
    blueScore: 0,
    redScore: 0,
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
