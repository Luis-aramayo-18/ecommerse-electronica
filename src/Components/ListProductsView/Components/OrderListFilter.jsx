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
            <i className="bx bx-customize text-lg"></i>
          </div>

          <div
            className={` absolute top-full z-50 w-full font-medium text-base transform transition-all duration-300 max-h-0 overflow-hidden ${
              orderListMobile ? "max-h-52 shadow-lg shadow-black" : ""
            }`}
          >
            <ul className="bg-gray-800 text-[#deecfb] border border-white p-4 flex flex-col w-full gap-2 backdrop-blur-md">
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
