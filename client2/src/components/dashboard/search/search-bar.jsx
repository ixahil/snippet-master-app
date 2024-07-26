"use client";

import { Filter, Plus, SearchIcon } from "lucide-react";
// import SnippetEditor from "../notes/editor/editor";
import { Modal } from "@/components/modal/modal";
import useStatus from "@/hooks/useStatus";
import SnippetEditor from "../snippets/snippets-editor/snippet-editor";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const { status, toggleStatus } = useStatus();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const onSubmit = (e) => {
    e.preventDefault();
    const val = e.target;
    const search = val.search;

    if (search.value) {
      newParams.set("search", search.value);
    } else {
      newParams.delete("search");
    }

    router.push(`?${newParams.toString()}`);
  };

  const clearSearch = () => {
    newParams.delete("search");
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-8 justify-center">
      <form
        className="relative w-full sm:w-1/2 bg-slate-100 dark:bg-dark-accent flex items-center border dark:border-gray-700 rounded-3xl"
        onSubmit={onSubmit}
      >
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none dark:border-gray-700">
          <SearchIcon size={18} className="text-gray-500" />
        </div>
        <input
          name="search"
          type="search"
          key={searchParams.get("search")}
          defaultValue={searchParams.get("search") || ""}
          id="default-search"
          className={
            "rounded-3xl bg-slate-100 dark:bg-dark-accent w-full block p-3 ps-10 text-sm text-gray-900 dark:text-white focus:outline-none"
          }
          placeholder={"Search a Snippet..."}
        />
        {searchParams.get("search") && (
          <input
            type="reset"
            value="Clear"
            id="default-search"
            className="relative right-6 cursor-pointer"
            onClick={clearSearch}
          />
        )}

        <button className="flex justify-center gap-2 px-3 items-center border dark:border-gray-700 h-full bg-accent text-white rounded-3xl">
          <Filter />
          <span className="hidden sm:block">Filter</span>
        </button>
      </form>
      <button
        onClick={toggleStatus}
        type="submit"
        className="flex gap-2 px-3 rounded-3xl bg-accent p-1 text-white top-1 right-1 items-center cursor-pointer select-none"
      >
        <Plus />
        <span className="hidden sm:block">Snippet</span>
      </button>
      <Modal showModal={status} toggleModal={toggleStatus}>
        <SnippetEditor type={"add"} toggleStatus={toggleStatus} />
      </Modal>
    </div>
  );
};

export default SearchBar;
