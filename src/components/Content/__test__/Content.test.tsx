import { Content } from "../index";

import { fireEvent, waitFor } from "@testing-library/react";

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

describe("test list card", () => {
  test("renders 10 cards", async () => {
    const { getAllByTestId } = renderWithProviders(<Content />);
    await waitFor(() => {
      const cards = getAllByTestId("card");
      expect(cards.length).toBe(10);
    });
  });
});
