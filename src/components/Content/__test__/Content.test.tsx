import { fireEvent, render } from "@testing-library/react";
import { Content } from "../index";
import {
  SearchContext,
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fakeData } from "../../../../test/__data__/testData";
import { DetailsCard } from "../../DetailsCard";
import { FetchData } from "../../../api/FetchData";
import { AxiosRequestHeaders } from "axios";

const mockData: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: fakeData!,
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
  personIsLoading: false,
  handlePersonLoading: jest.fn(),
  person: null,
  handlePerson: jest.fn(),
};
const mockDataWithoutCards: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: { ...fakeData, results: [] },
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
  personIsLoading: false,
  handlePersonLoading: jest.fn(),
  person: null,
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

describe("test list card", () => {
  test("renders 10 cards", () => {
    const { getAllByTestId } = render(
      <SearchContext.Provider value={mockData}>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </SearchContext.Provider>,
    );

    const cards = getAllByTestId("card");
    expect(cards.length).toBe(10);
  });
  test("renders 0 cards if no data", () => {
    const { queryAllByTestId } = render(
      <SearchContext.Provider value={mockDataWithoutCards}>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const cards = queryAllByTestId("card");
    expect(cards.length).toBe(0);
  });
  test("test click event to card, fetched data and render details", () => {
    const { getAllByTestId } = render(
      <SearchContext.Provider value={mockData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route
              path="/search/getallcharacters/page/details/:id?"
              element={<DetailsCard />}
            />
          </Routes>
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const cards = getAllByTestId("card");
    expect(window.location.pathname).toBe("/");
    fireEvent.click(cards[0]);
    const details = getAllByTestId("details");
    expect(details);
    expect(window.location.pathname).toBe(
      "/search/getallcharacters/page/details/1",
    );
    expect(FetchData.getChar).toHaveBeenCalled();
  });
});
