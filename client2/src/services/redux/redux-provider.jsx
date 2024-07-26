"use client";

import React, { useRef } from "react";
import makeStore from "./store";
import { Provider } from "react-redux";

const ReduxProvider = (props) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    // if (typeof window === "undefined") {
    // }
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
};

export default ReduxProvider;
