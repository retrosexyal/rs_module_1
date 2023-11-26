import { fireEvent, render } from "@testing-library/react";
import { Pagination } from "..";

import { renderWithProviders } from "../../../../utils/test-utils";

import { createMockRouter } from "../../../../utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

test("Make sure the component updates URL query parameter when page changes,", () => {
  const { queryAllByText } = renderWithProviders(
    <RouterContext.Provider value={createMockRouter({pathname: "3"})}>
      <Pagination number={3} />
    </RouterContext.Provider>
  );
  const router = createMockRouter({pathname: '/3'})
  expect(window.location.pathname).toBe("/");
  const number = queryAllByText("2")[0];
  fireEvent.click(number);

});
