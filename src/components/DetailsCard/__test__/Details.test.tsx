import { DetailsCard } from "..";

import { fireEvent, waitFor } from "@testing-library/react";
import { fakeData } from "../../../../test/__data__/testData";
import { server } from "../../../../mocks/node";
import { renderWithProviders } from "../../../../utils/test-utils";
server.use();
jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
    query: {id: "1"},
    push: jest.fn().mockResolvedValue({}),
  }),
}));

describe("test details", () => {
  test("Check that a loading indicator is displayed while fetching data", () => {
    const { getAllByTestId } = renderWithProviders(<DetailsCard />, {
      preloadedState: {
        loading: {
          detailsIsLoading: true,
          contentIsLoading: true,
        },
      },
    });
    const loader = getAllByTestId("person-loading");
    expect(loader);
  });
  test("Make sure the detailed card component correctly displays the detailed card data", async () => {
    const { getByText } = renderWithProviders(<DetailsCard />);
    await waitFor(() => {
      expect(getByText(`eye color: ${fakeData.results[0].eye_color}`));
    });
  });
});
