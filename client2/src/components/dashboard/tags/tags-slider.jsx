"use client";
import { useGetAllTagsQuery } from "@/services/redux/api/tags-api";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const tags = ["javascript", "TypeScript", "Java", "Pascal"];

const TagsSlider = () => {
  const [selected, setSelected] = useState([]);
  const searchParams = useSearchParams();

  const { data } = useGetAllTagsQuery();

  const router = useRouter();
  const handleSelect = (e) => {
    setSelected((prevSelected) => {
      let currentTags = [...prevSelected];
      const newParams = new URLSearchParams(searchParams.toString());

      if (e === "all") {
        currentTags = [];
      } else if (prevSelected.includes("all")) {
        currentTags = [e];
      } else if (prevSelected.includes(e)) {
        currentTags = prevSelected.filter((item) => item !== e);
      } else {
        currentTags = [...prevSelected, e];
      }
      if (currentTags.length) {
        newParams.set("tags", currentTags.join(" "));
        router.push(`?${newParams.toString()}`);
      } else {
        newParams.delete("tags");
        router.push(`?${newParams.toString()}`);
      }
      return currentTags;
    });
  };

  const clearSelection = () => {
    setSelected([]);
  };

  return (
    <div className="bg-white dark:bg-dark-accent p-3 rounded-lg flex items-center">
      <div className="tags-container w-full flex-nowrap sm:flex-wrap select-none">
        <div
          className={`text-slate-400 rounded-md w-20 p-2 text-center cursor-pointer ${
            !selected.length && "bg-accent text-white"
          }`}
          onClick={() => handleSelect("all")}
        >
          All
        </div>
        {data?.map((v, k) => (
          <div
            key={v + k}
            className={`text-slate-400 rounded-md w-20 text-center p-2 cursor-pointer ${
              selected.includes(v.title) && "bg-accent text-white"
            }`}
            onClick={() => handleSelect(v.title)}
          >
            {v.title}
          </div>
        ))}
      </div>
      <div className="bg-accent w-20 p-2 rounded-md text-white text-center flex items-center gap-2 font-bold cursor-pointer">
        <Plus />
        Tag
      </div>
    </div>
  );
};

export default TagsSlider;
