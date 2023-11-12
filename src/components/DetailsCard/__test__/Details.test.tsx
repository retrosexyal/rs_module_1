import { fireEvent, render, waitFor } from "@testing-library/react";
import { fakeData } from "../../../../test/__data__/testData";
import SearchContext, {
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailsCard } from "..";
import { FetchData } from "../../../api/FetchData";
import { AxiosRequestHeaders } from "axios";

const mockData: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: fakeData,
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
  personIsLoading: true,
  handlePersonLoading: jest.fn(),
  person: fakeData.results[0],
  handlePerson: jest.fn(),
};
jest.mock("../../../api/FetchData");
(
  FetchData.getChar as jest.MockedFunction<typeof FetchData.getChar>
).mockResolvedValue({
  data: fakeData.results[0],
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
});

describe("test details", () => {
  test("Check that a loading indicator is displayed while fetching data", () => {
    const { getAllByTestId } = render(
      <SearchContext.Provider value={mockData}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const loader = getAllByTestId("person-loading");
    expect(loader);
  });
  test("Make sure the detailed card component correctly displays the detailed card data", async () => {
    const { getByText } = render(
      <SearchContext.Provider value={{ ...mockData, personIsLoading: false }}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    await waitFor(() => {
      expect(getByText(`eye color: ${fakeData.results[0].eye_color}`));
    });
  });
  test("Ensure that clicking the close button hides the component", async () => {
    const { getByText, queryByTestId } = render(
      <SearchContext.Provider value={{ ...mockData, personIsLoading: false }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DetailsCard />} />
            <Route path="*" element={<div>details not exist</div>} />
          </Routes>
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const closeBtn = getByText("Close details");
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(queryByTestId("details")).toBeNull();
    });
  });
});
