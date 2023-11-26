import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../index";
import { store } from "../../_app";
import { Provider } from "react-redux";
import { useGetCharQuery } from "@/store/services/strarWras";
import fetchMock from "jest-fetch-mock";

function Wrapper(props: { children: React.ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
const data = {};

beforeAll(() => {
  fetchMock.mockOnceIf("https://swapi.dev/api/people/", () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});

it("App Router: Works with dynamic route segments", () => {
    const { result } = renderHook(() => useGetCharQuery("1"), {
    wrapper: Wrapper,
  });
  expect(result.current).toMatchObject({
    status: 'pending',
    endpointName: 'getChar',
    isLoading: true,
    isSuccess: false,
    isError: false,
    isFetching: true,
  });
  /* debug(); */
  /*   expect(screen.getByRole("heading")).toHaveTextContent("Slug: Test"); */
});
