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
  picture: "",
  country: "",
} as IFormValues;

const rhfSlice = createSlice({
  name: "rhf",
  initialState,
  reducers: {
    setRHFValues(state, action: PayloadAction<IFormValues>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setRHFValues } = rhfSlice.actions;
export default rhfSlice.reducer;
