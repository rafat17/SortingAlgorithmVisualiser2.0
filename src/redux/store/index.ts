import { configureStore } from "@reduxjs/toolkit";
import { blockReducer, inputControlReducer } from "../slices";

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    block: blockReducer,
    inputControl: inputControlReducer,
  },
});

export default store;
