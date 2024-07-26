import React from "react";

const NothingToShow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full m-auto bg-slate-100 dark:bg-dark-bg select-none">
      <img
        src={"/search-result-not-found.webp"}
        alt="Nothing to show"
        className="mb-4"
      />
      <div className="text-lg text-gray-600">Nothing to show</div>
      <div className="text-lg text-gray-600">
        Add some Notes to show up here
      </div>
    </div>
  );
};

export default NothingToShow;
