import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ItemsPerPageState {
  value: number;
}

const initialState = { value: 3 } as ItemsPerPageState;

const itemsPerPageSlice = createSlice({
  name: "itemsPerPage",
  initialState,
  reducers: {
    changeItemsPerPageValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { changeItemsPerPageValue } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
