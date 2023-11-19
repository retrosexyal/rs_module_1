import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pagination } from "..";
import configureStore from "redux-mock-store";
const mockStore = configureStore();
const initialState = { search: { value: "" } };

test("Make sure the component updates URL query parameter when page changes,", () => {
  const store = mockStore(initialState);
  const { queryAllByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagination number={3} />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
  expect(window.location.pathname).toBe("/");
  const number = queryAllByText("2")[0];
  fireEvent.click(number);
  expect(window.location.pathname).toBe("/search/getallcharacters/page/2");
});
