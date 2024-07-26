import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = (props) => {
  return (
    <Link className="flex gap-2 items-center" href={props.href}>
      <div className="bg-accent p-2 rounded-md">
        <Code color="white" className="size-4 sm:size-6" />
      </div>
      <div className="flex gap-1 text-sm sm:text-xl flex-wrap dark:text-dark-text">
        <span className="text-accent font-bold">Snippet</span>
        <span className="text-slate-600 dark:text-slate-400">Master</span>
      </div>
    </Link>
  );
};

export default Logo;
