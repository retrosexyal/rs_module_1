import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
}

const initialState = { value: "" } as SearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { changeSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
