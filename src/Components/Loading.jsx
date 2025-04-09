import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute right-4 z-50">
      <div className="w-4 h-4 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
