import { fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Search } from "..";
import { renderWithProviders } from "../../../test-utils";
import configureStore from "redux-mock-store";
import "jest-localstorage-mock";
const mockStore = configureStore();
const initialState = { search: { value: "" } };

test("Verify that clicking the Search button saves the entered value to the local storage", async () => {
  const store = mockStore(initialState);

  const { getByTestId } = renderWithProviders(
    <Provider store={store}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </Provider>,
  );
  const input = getByTestId("input");
  fireEvent.change(input, { target: { value: "testValue" } });
  const btn = getByTestId("search-btn");
  fireEvent.click(btn);

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "search/changeSearchValue", payload: "testValue" },
    ]);
  });
});
