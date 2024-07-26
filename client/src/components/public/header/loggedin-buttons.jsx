import Link from "next/link";
import React from "react";

const LoggedInButtons = () => {
  return (
    <Link
      href={"/dashboard/home"}
      className="border-2 border-accent text-accent rounded-md p-2 hover:bg-accent hover:text-white transition ease-in duration-400"
    >
      Go to App
    </Link>
  );
};

export default LoggedInButtons;
