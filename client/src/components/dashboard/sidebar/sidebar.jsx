"use client";

import { MenuData } from "@/data/menu";
import Menu from "./menu";
import Logo from "@/components/public/header/logo";

const Sidebar = () => {
  return (
    <aside
      className={`hidden col-span-2 p-5 md:flex flex-col gap-2 pt-7 border-r bg-white dark:border-slate-400 dark:bg-dark-accent`}
    >
      <Logo href={"/dashboard"} />
      <Menu menu={MenuData} />
    </aside>
  );
};

export default Sidebar;
