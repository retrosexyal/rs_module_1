import { combineReducers, configureStore } from "@reduxjs/toolkit";

import formReducer from "./slices/formSlice";
import rhfReducer from "./slices/rhfSlice";

const rootReducer = combineReducers({
  form: formReducer,
  rhf: rhfReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
