import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_SELECTED_SORTING_ALGORITHM,
} from "@/constants/defaultValues";

const initialState = {
  animationSpeed: DEFAULT_ANIMATION_SPEED,
  lockControls: false,
  selectedSortingAlgorithm: DEFAULT_SELECTED_SORTING_ALGORITHM,
};

export const inputControlSlice = createSlice({
  name: "inputControl",
  initialState,
  reducers: {
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
    toggleLockControls: (state) => {
      state.lockControls = !state.lockControls;
    },
    setSelectedAlgorithm: (state, action) => {
      state.selectedSortingAlgorithm = action.payload;
    },
  },
});

export const { setAnimationSpeed, toggleLockControls, setSelectedAlgorithm } =
  inputControlSlice.actions;

export default inputControlSlice.reducer;
