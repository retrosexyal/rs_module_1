import { fireEvent, render } from "@testing-library/react";
import SearchContext, {
  SearchContextType,
} from "../../../providers/SearchProviders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pagination } from "..";
import { fakeData } from "../../../../test/__data__/testData";

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

test("Make sure the component updates URL query parameter when page changes,", () => {
  const { queryAllByText } = render(
    <SearchContext.Provider value={mockDataWithoutCards}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagination number={3} />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>,
  );
  expect(window.location.pathname).toBe("/");
  const number = queryAllByText("2")[0];
  fireEvent.click(number);
  expect(window.location.pathname).toBe("/search/getallcharacters/page/2");
});
