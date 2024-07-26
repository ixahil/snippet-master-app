"use client";

import { MenuData } from "@/data/menu";
import Menu from "./menu";
import Logo from "@/components/public/header/logo";
import { Code } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside
      className={`hidden col-span-2 p-5 md:flex flex-col gap-2 pt-7 border-r bg-white dark:border-slate-400 dark:bg-dark-accent`}
    >
      <Logo href={"/dashboard"} />

      <Menu menu={MenuData} />
      <div className="flex gap-2 items-center justify-center text-xs mt-auto">
        <Code /> Developed and Managed by {" >"}
        <Link
          target="_blank"
          rel="nofollow"
          className="text-blue-400 font-medium"
          href={"https://sahildev.pro/"}
        >
          SahilDev.Pro
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
