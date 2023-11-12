import { fireEvent, render } from "@testing-library/react";
import { Content } from "../index";
import {
  SearchContext,
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter /* , Route */ } from "react-router-dom";
import { fakeData } from "../../../../test/__data__/testData";
/* import { DetailsCard } from "../../DetailsCard"; */

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
  test("test click event to card", () => {
    const { getAllByTestId } = render(
      <SearchContext.Provider value={mockData}>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const cards = getAllByTestId("card");
    fireEvent.click(cards[0]);

    /*     const detais = getAllByTestId("details");
    expect(detais); */
  });
});
