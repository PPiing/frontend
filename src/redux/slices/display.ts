import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DisplayData {
  ismodal: boolean
}

export const display = createSlice({
  name: "display",
  initialState: {
    ismodal: false,
  } as DisplayData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setModalTrigger: (state, action: PayloadAction<DisplayData>) => {
      state.ismodal = action.payload.ismodal;
    },
  }
});

export const { setModalTrigger } = display.actions;
export default display.reducer;