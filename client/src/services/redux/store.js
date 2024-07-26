import { configureStore } from "@reduxjs/toolkit";
import userApi from "./api/user-api";
import userSlice from "./features/user-slice";
import snippetApi from "./api/snippet-api";
import tagsApi from "./api/tags-api";

const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.reducerPath]: userSlice.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [snippetApi.reducerPath]: snippetApi.reducer,
      [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      userApi.middleware,
      snippetApi.middleware,
      tagsApi.middleware,
    ],
  });
};

export default makeStore;
