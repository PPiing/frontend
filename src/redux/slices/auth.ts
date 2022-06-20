import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthData {
  auth: boolean;
  auth2f: boolean;
  isRequire2f: boolean;
}

export const auth = createSlice({
  name: "auth",
  initialState: {
    auth: false, // Set true for test on local without auth.
    auth2f: false,
    isRequire2f: false
  } as AuthData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setAuth: (state, action: PayloadAction<AuthData>) => {
      state.auth = action.payload.auth;
    },
    setAuth2f: (state, action: PayloadAction<AuthData>) => {
      state.auth2f = action.payload.auth2f;
    },
    setAuthRequire2f: (state, action: PayloadAction<AuthData>) => {
      state.isRequire2f = action.payload.isRequire2f;
    },
  }
});

export const { setAuth, setAuth2f, setAuthRequire2f } = auth.actions;
export default auth.reducer;
