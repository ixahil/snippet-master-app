"use client";
import { languagesIcons } from "@/data/icon-set";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";

const languages = [
  "javascript",
  "java",
  "typescript",
  "php",
  "python",
  "html",
  "css",
];

const languageObjects = languages.map((language) => ({
  label: language,
  href: `/dashboard/language/${language}`,
  icon: languagesIcons[language] || null,
  path: language,
}));

const Menu = (props) => {
  const pathname = usePathname();

  const path = pathname.split("/").pop();
  const renderedMenu = (data) => {
    return data.map((v, k) => (
      <Link
        key={v.label + k}
        href={v.href}
        className={`flex items-center gap-2 p-2 py-3 rounded-md hover:bg-accent hover:text-white transition ease-in duration-300 ${
          path === v.path && "bg-accent text-white"
        }`}
      >
        {v.icon}
        {v.label}
      </Link>
    ));
  };

  return (
    <div className="my-20 text-xs sm:text-sm space-y-8 w-[80%]">
      <div className="">
        <h3 className="py-4 font-bold text-slate-400">Quick Links</h3>
        <ul className="text-slate-400 flex flex-col gap-2 justify-center">
          {renderedMenu(props.menu)}
        </ul>
      </div>
      <div className="">
        <h3 className="py-4 font-bold text-slate-400">Languages</h3>
        <ul className="text-slate-400 flex flex-col gap-2 justify-center uppercase text-sm">
          {renderedMenu(languageObjects)}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
