import "@testing-library/jest-dom";
import { server } from "../mock/api/server";
import { starWarsApi } from "./store/services/strarWras";
import { setupStore } from "./store";

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();

  store.dispatch(starWarsApi.util.resetApiState());
});

afterAll(() => server.close());
