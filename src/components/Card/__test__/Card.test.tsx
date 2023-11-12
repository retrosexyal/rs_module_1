import { render } from "@testing-library/react";
import { Card } from "../index";
import { fakeData } from "../../../../test/__data__/testData";
const person = fakeData.results[0];

describe("test card", () => {
  test("card component renders the relevant card data", () => {
    const { getByText } = render(<Card person={person} />);
    expect(getByText(`name: ${person.name}`));
    expect(getByText(`mass: ${person.mass}`));
    expect(getByText(`height: ${person.height}`));
  });
  /* test("renders 0 cards if no data", () => {
    const { queryAllByTestId } = render(
      <SearchContext.Provider value={mockDataWithoutCards}>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </SearchContext.Provider>,
    );
    const cards = queryAllByTestId("card");
    expect(cards.length).toBe(0);
  }); */
});
