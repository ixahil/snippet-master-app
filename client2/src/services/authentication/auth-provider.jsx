"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useGetUserQuery } from "../redux/api/user-api";
import Spinner from "@/components/loader";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/features/user-slice";

const AuthProvider = (props) => {
  const router = useRouter();
  const { isSuccess, isLoading } = useGetUserQuery();
  const { loggedIn } = useSelector(userSelector);
  if (isLoading) {
    return <Spinner />;
  } else if (loggedIn) return props.children;
  else router.push("/login");
};

export default AuthProvider;
