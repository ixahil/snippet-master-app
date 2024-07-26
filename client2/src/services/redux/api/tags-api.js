import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformErrorResponse, transformResponse } from "../utils";

const baseUrl = process.env.NEXT_PUBLIC_API;

const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "tags",
    credentials: "include",
  }),
  tagTypes: ["tags"],
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => "",
      transformResponse,
      transformErrorResponse,
      providesTags: ["tags"],
    }),
  }),
});

export const { useGetAllTagsQuery } = tagsApi;

export default tagsApi;
