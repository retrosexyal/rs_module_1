import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFormValues } from "../../interface";

const initialState = {
  name: "",
  age: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  acceptTerms: false,
  picture: {} || null,
  country: "",
} as IFormValues;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormValues(state, action: PayloadAction<IFormValues>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFormValues } = formSlice.actions;
export default formSlice.reducer;
