import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center z-50 ${className}`}>
      <div className="w-4 h-4 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
