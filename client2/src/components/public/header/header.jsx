import React from "react";
import Logo from "./logo";
import SignInButtons from "./signin-button";
import ThemeChanger from "@/components/dashboard/theme/theme-changer";

const Header = () => {
  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-8 sm:gap-0">
      <Logo href={"/"} />
      <div className="flex gap-4">
        <SignInButtons />
        <ThemeChanger />
      </div>
    </header>
  );
};

export default Header;
