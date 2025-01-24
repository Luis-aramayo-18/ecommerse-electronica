import React from "react";

const StepsForm = ({ step, isStepComplete }) => {
  return (
    <div className="flex justify-between items-center w-full my-5">
      {/* Step 1 */}
      <div className="flex items-center w-full">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
            step === 0
              ? "bg-blue-500"
              : isStepComplete(0)
              ? "bg-blue-500"
              : "bg-gray-300"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 flex-1 ${
            isStepComplete(0) ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
      </div>

      {/* Step 2 */}
      <div className="flex items-center justify-center w-full">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
            step === 1
              ? "bg-blue-500"
              : isStepComplete(1)
              ? "bg-blue-500"
              : "bg-gray-300"
          }`}
        >
          2
        </div>
        <div
          className={`h-1 flex-1 ${
            isStepComplete(1) ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
      </div>

      {/* Step 3 */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
            step === 2
              ? "bg-blue-500"
              : isStepComplete(2)
              ? "bg-gray-300"
              : "bg-gray-300"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
};

export default StepsForm;
