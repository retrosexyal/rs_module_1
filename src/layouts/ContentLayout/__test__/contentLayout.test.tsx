import { ContentLayout } from "..";
import { renderWithProviders } from "../../../test-utils";
import { BrowserRouter } from "react-router-dom";

test("Verify that content loading", async () => {
  const { getByText } = renderWithProviders(
    <BrowserRouter>
      <ContentLayout />
    </BrowserRouter>,
  );

  expect(getByText("loading"));
});
