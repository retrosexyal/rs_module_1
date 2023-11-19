import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailsCard } from "..";
import { renderWithProviders } from "../../../test-utils";
import { server } from "../../../../mock/api/server";
import { fireEvent, waitFor } from "@testing-library/react";
import { fakeData } from "../../../../test/__data__/testData";

describe("test details", () => {
  server.use();
  test("Check that a loading indicator is displayed while fetching data", () => {
    const { getAllByTestId } = renderWithProviders(
      <BrowserRouter>
        <DetailsCard />
      </BrowserRouter>,
      {
        preloadedState: {
          loading: {
            detailsIsLoading: true,
            contentIsLoading: true,
          },
        },
      },
    );
    const loader = getAllByTestId("person-loading");
    expect(loader);
  });
  test("Make sure the detailed card component correctly displays the detailed card data", async () => {
    const { getByText } = renderWithProviders(
      <BrowserRouter>
        <DetailsCard />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(getByText(`eye color: ${fakeData.results[0].eye_color}`));
    });
  });
  test("Ensure that clicking the close button hides the component", async () => {
    const { getByText, queryByTestId } = renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DetailsCard />} />
          <Route path="*" element={<div>details not exist</div>} />
        </Routes>
      </BrowserRouter>,
    );
    await waitFor(() => {
      const closeBtn = getByText("Close details");
      fireEvent.click(closeBtn);
      expect(queryByTestId("details")).toBeNull();
    });
  });
});
