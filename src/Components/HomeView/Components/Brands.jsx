import React from "react";

const Brands = () => {
  return (
    <section className="mx-6 sm:mx-6 md:mx-14 lg:mx-24 xl:mx-24 2xl:mx-24 py-10">
      <div className="mt-10 mb-10 flex flex-col justify-center h-full">
        <div className="flex justify-start items-center text-center gap-1 uppercase tracking-widest text-2xl font-semibold text-[#f0f7fe]">
          <h2>Las mejores marcas</h2>
        </div>

        <div className="gap-8 grid grid-rows-3 lg:grid-rows-2 grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-4 place-items-center mt-10 ">
          <div className="flex justify-center items-center border-4 border-white rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[1/3] sm:row-[1/2] lg:col-[1/2] lg:row-[1/2] bg-[#9cccf4]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/dell.png"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center border-4 border-white rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[3/5] sm:row-[1/2] lg:col-[2/3] lg:row-[1/2] bg-[#9cccf4]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/lenovo.png"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center border-4 border-white bg-[#9cccf4] rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[5/7] sm:row-[1/2] lg:col-[3/4] lg:row-[1/2]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/motorola.png"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center border-4 border-white bg-[#9cccf4] rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[2/4] sm:row-[2/3] lg:col-[4/5] lg:row-[1/2]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/hp.png"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center border-4 border-white bg-[#9cccf4] rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[4/6] sm:row-[2/3] lg:col-[2/3] lg:row-[2/3]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/samsung.png"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center border-4 border-white bg-[#9cccf4] rounded-full w-36 h-36 sm:w-52 sm:h-52 sm:col-[3/5] sm:row-[3/4] lg:col-[3/4] lg:row-[2/3]">
            <img
              className="h-28 w-28 sm:w-36 sm:h-36 object-contain filter saturate-0 contrast-150"
              src="./img/home/iphone.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
