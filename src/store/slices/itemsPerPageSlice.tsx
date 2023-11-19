import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../interface";

interface ItemsPerPageState {
  data: IData[];
}

const initialState = { data: [] } as ItemsPerPageState;

const itemsPerPageSlice = createSlice({
  name: "itemsPerPage",
  initialState,
  reducers: {
    changeItemsPerPageValue(state, action: PayloadAction<IData[]>) {
      state.data = action.payload;
    },
  },
});

export const { changeItemsPerPageValue } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
