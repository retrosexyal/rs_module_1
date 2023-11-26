import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData, IResponse } from "../../interface";
import { URL } from "../../api/url";
import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { HYDRATE } from "next-redux-wrapper";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL.MAIN }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["IData"],
  endpoints: (builder) => ({
    getSearch: builder.query<IResponse, { search?: string; page?: string }>({
      query: ({ search = "", page = "" }) =>
        `people/?search=${search}&page=${page}`,
      providesTags: (result, error) => {
        if (error || !result) {
          return [];
        }
        const tags: FullTagDescription<"IData">[] = [
          { type: "IData", id: "LIST" },
        ];
        return tags;
      },
    }),
    getChar: builder.query<IData, string>({
      query: (id = "") => `people/${id}`,
    }),
  }),
});

export const {
  useGetSearchQuery,
  useGetCharQuery,
  util: { getRunningQueriesThunk },
} = starWarsApi;
export const { getSearch, getChar } = starWarsApi.endpoints;
