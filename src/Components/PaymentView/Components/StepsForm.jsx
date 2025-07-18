import React from "react";

const StepsForm = ({ step, isStepComplete }) => {
  return (
    <div className="flex justify-between items-center w-full my-5">
      {/* Step 1 */}
      <div className="flex items-center w-full">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-black font-bold border border-black/25 ${
            step >= 0 ? "bg-[#fce803]" : "bg-gray-600"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 flex-1 ${step > 0 ? " bg-[#fce803]" : "bg-gray-600"}`}
        ></div>
      </div>

      {/* Step 2 */}
      <div className="flex items-center justify-center w-full">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-black font-bold border border-black/25 ${
            step >= 1 ? "bg-[#fce803]" : "bg-gray-600"
          }`}
        >
          2
        </div>
        <div
          className={`h-1 flex-1 ${step > 1 ? " bg-[#fce803]" : "bg-gray-600"}`}
        ></div>
      </div>

      {/* Step 4 */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-black font-bold border border-black/25 ${
            step == 2
              ? "bg-[#fce803]"
              : step === 2
              ? "bg-gray-600"
              : "bg-gray-600"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
};

export default StepsForm;
