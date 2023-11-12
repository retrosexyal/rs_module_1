import { fireEvent, render /* , waitFor */ } from "@testing-library/react";
import { fakeData } from "../../../../test/__data__/testData";
import SearchContext, {
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter } from "react-router-dom";
import { Search } from "..";

const mockData: SearchContextType = {
  inputValue: "",
  handleInputChange: jest.fn(),
  data: fakeData,
  handleData: jest.fn(),
  isLoading: false,
  handleLoading: jest.fn(),
  personIsLoading: false,
  handlePersonLoading: jest.fn(),
  person: null,
  handlePerson: jest.fn(),
};

test("test click event to card, fetched data and render details", async () => {
  const { getByTestId } = render(
    <SearchContext.Provider value={mockData}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </SearchContext.Provider>,
  );
  const input = getByTestId("input");
  const btn = getByTestId("search-btn");
  expect(mockData.inputValue).toBe("");

  fireEvent.change(input, { target: { value: "new value" } });
  fireEvent.click(btn);

  /*  expect(mockData.inputValue).toBe("new value");

  await waitFor(() => {
    expect(mockData.inputValue).toBe("new value");
  }); */
});
