import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { starWarsApi } from "./services/strarWras";
import itemsPerPageReducer from "./slices/itemsPerPageSlice";
import searchReducer from "./slices/searchSlice";
import loadingReducer from "./slices/loadingSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemsPerPageReducer,
  loading: loadingReducer,
  starWarsApi: starWarsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const makeStore = () =>
  configureStore({
    reducer: {
      [starWarsApi.reducerPath]: starWarsApi.reducer,
      search: searchReducer,
      items: itemsPerPageReducer,
      loading: loadingReducer,
    },
    middleware: (gDM) => gDM().concat(starWarsApi.middleware),
  });

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
