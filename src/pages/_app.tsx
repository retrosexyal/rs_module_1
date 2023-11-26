import { ErrorBoundary } from "@/components/ErrorBoudary";
import { setupStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
