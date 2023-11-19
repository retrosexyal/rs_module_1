import { HttpResponse, http } from "msw";
import { fakeData } from "../../test/__data__/testData";

export const handlers = [
  http.get(`https://swapi.dev/api/people/`, async () => {
    return HttpResponse.json(fakeData);
  }),
  http.get("https://swapi.dev/api/people/1", async () => {
    return HttpResponse.json(fakeData.results[0]);
  }),
];
