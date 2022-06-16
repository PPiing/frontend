import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "./rootReducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch
export default store;
