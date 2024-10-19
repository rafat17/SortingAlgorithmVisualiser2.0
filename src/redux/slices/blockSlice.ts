import { createSlice } from "@reduxjs/toolkit";
import getNewBlockArray from "../../utils/getNewBlockArray";
import { DEFAULT_BLOCK_COUNT } from "../../constants/defaultValues";

const initialState = {
  count: DEFAULT_BLOCK_COUNT,
  blocks: getNewBlockArray(DEFAULT_BLOCK_COUNT),
};

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    setBlockCount: (state, action) => {
      state.count = action.payload;
    },
    setBlocks: (state, action) => {
      state.blocks = action.payload;
    },
  },
});

export const { setBlockCount, setBlocks } = blockSlice.actions;

export default blockSlice.reducer;
