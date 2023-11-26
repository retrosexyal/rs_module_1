import  SearchPage  from "../index";

import {  waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";

import { server } from "../../../../mocks/node";

server.use()

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
    query: {},
    push: jest.fn().mockResolvedValue({}),
  }),
}));

describe("test search page", () => {
  test("renders 10 cards", async () => {
    const { getAllByTestId } = renderWithProviders(<SearchPage />);
    await waitFor(() => {
      const cards = getAllByTestId("card");
      expect(cards.length).toBe(10);
    });
  });
});
