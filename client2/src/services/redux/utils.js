import toast from "react-hot-toast";

export const apiBaseURL = process.env.NEXT_PUBLIC_API;

export const transformErrorResponse = (err) => {
  if (err.status === "FETCH_ERROR") {
    toast.error("Internal server error!");
  }
  if (err.originalStatus === 404) {
    toast.error("Something went wrong!");
  }
  if (err.status === 400) {
    toast.error(err.data.message);
  }
  if (err.status === 401) {
    toast.error(err.data.message);
  }
  if (err.status === 401) {
    toast.error(err.data.message);
  }
  if (err.status === 500) {
    toast.error(err.data.message);
  }
  return err;
};
export const transformResponse = (response) => {
  if (response.statusCode === 200 || response.statusCode === 201) {
    if (response.message) {
      toast.success(response.message);
    }
  }

  const { data } = response;
  return data;
};

export const saveToLocalStorage = (state, name) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem(name, serializedState);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loadFromLocalStorage = (item) => {
  try {
    const serializedState = window.localStorage.getItem(item);

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
};

// export const loadFromLocalStorage = () => {
//   let preloadedState;
//   const persistedState = localStorage?.getItem("cart");

//   if (persistedState) {
//     preloadedState = JSON.parse(persistedState);
//   }
//   return preloadedState;
// };
