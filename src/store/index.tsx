import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./services/strarWras";
import itemsPerPageReducer from "./slices/itemsPerPageSlice";
import searchReducer from "./slices/searchSlice";
import loadingReducer from "./slices/loadingSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemsPerPageReducer,
  loading: loadingReducer,
  starWarsApi: starWarsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
