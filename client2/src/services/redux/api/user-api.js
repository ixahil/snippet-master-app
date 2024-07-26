import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformErrorResponse, transformResponse } from "../utils";
import { logout, setUser } from "../features/user-slice";

const baseUrl = process.env.NEXT_PUBLIC_API;

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "me",
      transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      transformErrorResponse,
      transformResponse,
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      transformErrorResponse,
      transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      transformErrorResponse,
      transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(logout());
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignUpUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;

export default userApi;
