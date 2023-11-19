import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import type { RenderOptions } from "@testing-library/react";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { AppStore, RootState } from "./store";
import { setupStore } from "./store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
