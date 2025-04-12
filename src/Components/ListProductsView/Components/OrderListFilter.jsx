import React from "react";

const OrderListFilter = ({
  setOrderListMobile,
  orderListMobile,
  valueOrder,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      <div className="hidden lg:w-full lg:flex lg:justify-end lg:relative lg:mb-5">
        <button
          className={`max-w-72 relative`}
          onClick={() => setOrderListMobile(!orderListMobile)}
        >
          <div className="hidden lg:flex items-center justify-end gap-2 text-start text-[#f0f7fe]">
            <p className="font-semibold text-sm">
              ORDENAR POR: <span className="text-[#fea401]">{valueOrder}</span>
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>

          <div
            className={` absolute  top-full z-50 w-full font-medium text-base transform transition-all duration-300 max-h-0 overflow-hidden ${
              orderListMobile ? "max-h-52 shadow-lg shadow-black" : ""
            }`}
          >
            <ul className="bg-black/70 rounded-2xl shadow-[0_4px_10px_0_#6B7280] text-[#deecfb] border border-white p-4 flex flex-col w-full gap-2 backdrop-blur-md">
              <li
                className={`cursor-pointer text-start transition-all duration-100 ${
                  filters.sort === "discount"
                    ? "text-[#fea401]"
                    : "hover:text-[#fea401]"
                }`}
                onClick={() => handleFilterChange("sort", "discount")}
              >
                Descuentos
              </li>

              <li
                className={`cursor-pointer text-start transition-all duration-100 ${
                  filters.sort === "best_selling"
                    ? "text-[#fea401]"
                    : "hover:text-[#fea401]"
                }`}
                onClick={() => handleFilterChange("sort", "best_selling")}
              >
                Mas Vendido
              </li>

              <li
                className={`cursor-pointer text-start transition-all duration-100 ${
                  filters.sort === "best_rated"
                    ? "text-[#fea401]"
                    : "hover:text-[#fea401]"
                }`}
                onClick={() => handleFilterChange("sort", "best_rated")}
              >
                Mejores Calificados
              </li>

              <li
                className={`cursor-pointer text-start transition-all duration-100 ${
                  filters.sort === "latest"
                    ? "text-[#fea401]"
                    : "hover:text-[#fea401]"
                }`}
                onClick={() => handleFilterChange("sort", "latest")}
              >
                Últimos
              </li>
            </ul>
          </div>
        </button>
      </div>
    </>
  );
};

export default OrderListFilter;
