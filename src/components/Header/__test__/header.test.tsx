import { fireEvent } from "@testing-library/react";
import { Header } from "..";
import { renderWithProviders } from "../../../test-utils";
import { BrowserRouter } from "react-router-dom";

test("Verify that render error btn", async () => {
  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  const btn = getByTestId("error-btn");
  fireEvent.click(btn);
});
