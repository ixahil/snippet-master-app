import { Loader } from "lucide-react";
import React from "react";

const LoadingButton = ({ className, children, isLoading, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader className="animate-spin" />}
      {children}
    </button>
  );
};

export default LoadingButton;
