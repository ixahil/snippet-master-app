"use client";
import React, { useState } from "react";

const useStatus = (defaultStatus = false) => {
  const [status, setStatus] = useState(defaultStatus);

  const toggleStatus = () => {
    setStatus((prev) => !prev);
  };

  const setToggleStatus = (status) => {
    setStatus(status);
  };

  return { status, toggleStatus, setToggleStatus };
};

export default useStatus;
