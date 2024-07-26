"use client";
import { userSelector } from "@/services/redux/features/user-slice";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoggedInButtons from "./loggedin-buttons";
import { useGetUserQuery } from "@/services/redux/api/user-api";
import Spinner from "@/components/loader";
import { Loader } from "lucide-react";
// import { useAuthContext } from "@/components/auth-provider/auth-provider";

const SignInButtons = () => {
  // const { user } = useAuthContext();
  const { isLoading } = useGetUserQuery();
  const { loggedIn } = useSelector(userSelector);

  return (
    <div className="flex gap-2 items-center">
      {isLoading && <Loader className="animate-spin mr-4" />}
      {loggedIn && <LoggedInButtons />}
      <div className="flex gap-2 flex-col sm:flex-row w-2/3 sm:w-fit">
        <Link href={"login"} className="bg-accent text-white rounded-md p-2">
          Sign In
        </Link>
        <Link
          href={"signup"}
          className="border-2 border-accent text-accent rounded-md p-2 hover:bg-accent hover:text-white transition ease-in duration-400"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInButtons;
