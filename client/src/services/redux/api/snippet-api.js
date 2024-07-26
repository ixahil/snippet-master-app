import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformErrorResponse, transformResponse } from "../utils";
import { logout, setUser } from "../features/user-slice";

const baseUrl = process.env.NEXT_PUBLIC_API;

const snippetApi = createApi({
  reducerPath: "snippetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "notes",
    credentials: "include",
  }),
  tagTypes: ["notes"],
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: (q) => q,
      transformResponse,
      providesTags: ["notes"],
    }),
    getNotesByLanguage: builder.query({
      query: (lang) => `language/${lang}`,
      transformResponse,
      transformErrorResponse,
      providesTags: ["notes"],
    }),
    getANote: builder.query({
      query: (id) => id,
      transformResponse,
      transformErrorResponse,
      providesTags: ["notes"],
    }),
    addNote: builder.mutation({
      query: (data) => ({
        url: "new",
        method: "POST",
        body: data,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["notes", "tags"],
    }),
    updateNote: builder.mutation({
      query: ({ id, data }) => ({
        url: id,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notes", "tags"],
      transformErrorResponse,
      transformResponse,
    }),
    moveToTrash: builder.mutation({
      query: (id) => ({
        url: id,
        method: "PATCH",
      }),
      invalidatesTags: ["notes"],
      transformErrorResponse,
      transformResponse,
    }),
    undoFromTrash: builder.mutation({
      query: (id) => ({
        url: `undo/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notes"],
      transformErrorResponse,
      transformResponse,
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useGetANoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useGetNotesByLanguageQuery,
  useMoveToTrashMutation,
  useUndoFromTrashMutation,
} = snippetApi;

export default snippetApi;
