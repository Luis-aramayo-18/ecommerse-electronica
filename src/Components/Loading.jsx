import React from "react";

const Loading = ({ className = "", bg = false }) => {
  return (
    <div className={`flex justify-center items-center z-50 ${className}`}>
      <div
        className={`${
          bg ? "border-black" : "border-[#fce803]"
        } w-4 h-4 border-4  border-t-transparent rounded-full animate-spin`} 
      ></div>
    </div>
  );
};

export default Loading;
