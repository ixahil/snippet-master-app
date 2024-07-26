import { LoaderIcon } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div role="status" className="h-[80vh] flex justify-center items-center">
      <LoaderIcon className="animate-spin" color="black" size={44} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
