import React from "react";

const OrderListFilter = ({setOrderListMobile, orderListMobile, valueOrder, filters, handleFilterChange}) => {
  return (
    <div className="hidden lg:w-full lg:flex lg:justify-end lg:relative lg:mb-5">
      <button
        className={`max-w-72 relative`}
        onClick={() => setOrderListMobile(!orderListMobile)}
      >
        <div className="flex items-center gap-2 text-start">
          <p className="font-semibold text-sm">ORDENAR POR: {valueOrder}</p>
          <i className="bx bx-customize text-lg"></i>
        </div>

        <ul
          className={` absolute top-full z-50 w-full font-medium text-base transform transition-all duration-300 max-h-0 overflow-hidden ${
            orderListMobile ? "max-h-52 shadow-lg shadow-black" : ""
          }`}
        >
          <div className="bg-gray-800 text-white border border-white p-4 flex flex-col w-full gap-2 backdrop-blur-md">
            <li
              className={`cursor-pointer text-start ${
                filters.sort === "Discount"
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={() => handleFilterChange("sort", "Discount")}
            >
              Descuentos
            </li>

            <li
              className={`cursor-pointer text-start ${
                filters.sort === "Sold"
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={() => handleFilterChange("sort", "Sold")}
            >
              Ventas
            </li>

            <li
              className={`cursor-pointer text-start ${
                filters.sort === "Rating"
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={() => handleFilterChange("sort", "Rating")}
            >
              Mejores Calificados
            </li>

            <li
              className={`cursor-pointer text-start ${
                filters.sort === "Last"
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={() => handleFilterChange("sort", "Last")}
            >
              Últimos Agregados
            </li>
          </div>
        </ul>
      </button>
    </div>
  );
};

export default OrderListFilter;
