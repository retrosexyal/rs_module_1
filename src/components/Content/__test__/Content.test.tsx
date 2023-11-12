import { render } from "@testing-library/react";
import { Content } from "../index";
import {
  SearchContext,
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter } from "react-router-dom";
import { fakeData } from "../../../../test/__data__/testData";

const mockData: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: fakeData!,
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
};
const mockDataWithoutCards: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: { ...fakeData, results: [] },
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
};

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
});
