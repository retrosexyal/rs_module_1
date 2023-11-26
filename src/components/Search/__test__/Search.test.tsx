import { fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Search } from "..";
import configureStore from "redux-mock-store";
import { renderWithProviders } from "../../../../utils/test-utils";


jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
    query: {},
    push: jest.fn().mockImplementation(async () => ({ success: true })),
  }),
}));


const mockStore = configureStore();
const initialState = { search: { value: "" } };

test("Verify that clicking the Search button saves the entered value to the local storage", async () => {

  const store = mockStore(initialState);
  const { getByTestId } = renderWithProviders(
    <Provider store={store}>
      <Search />
    </Provider>
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
