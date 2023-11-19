import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  contentIsLoading: boolean;
  detailsIsLoading: boolean;
}

const initialState = {
  contentIsLoading: false,
  detailsIsLoading: false,
} as LoadingState;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeContentIsLoading(state, action: PayloadAction<boolean>) {
      state.contentIsLoading = action.payload;
    },
    changeDetailsIsLoading(state, action: PayloadAction<boolean>) {
      state.detailsIsLoading = action.payload;
    },
  },
});

export const { changeContentIsLoading, changeDetailsIsLoading } =
  loadingSlice.actions;
export default loadingSlice.reducer;
