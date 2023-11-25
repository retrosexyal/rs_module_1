import { Content } from "../index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { renderWithProviders } from "../../../test-utils";

import { fireEvent, waitFor } from "@testing-library/react";
import { DetailsCard } from "../../DetailsCard";

describe("test list card", () => {
  test("renders 10 cards", async () => {
    const { getAllByTestId } = renderWithProviders(
      <BrowserRouter>
        <Content />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const cards = getAllByTestId("card");
      expect(cards.length).toBe(10);
    });
  });
  test("test click event to card, fetched data and render details", async () => {
    const { getAllByTestId } = renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="/search/getallcharacters/page/details/:id?"
            element={<DetailsCard />}
          />
        </Routes>
      </BrowserRouter>,
    );
    await waitFor(() => {
      const cards = getAllByTestId("card");
      expect(window.location.pathname).toBe("/");
      fireEvent.click(cards[0]);
      const details = getAllByTestId("details");
      expect(details);
    });
    expect(window.location.pathname).toBe(
      "/search/getallcharacters/page/details/1",
    );
  });
});
