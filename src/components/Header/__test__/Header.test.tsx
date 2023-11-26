import { fireEvent } from "@testing-library/react";
import { Header } from "..";
import { renderWithProviders } from "../../../../utils/test-utils";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
    query: {},
    push: jest.fn().mockImplementation(async () => ({ success: true })),
  }),
}));

test("Verify that render error btn", async () => {
  const { getByTestId, getByText } = renderWithProviders(<Header />);
  const btn = getByTestId("error-btn");
  fireEvent.click(btn);
});
