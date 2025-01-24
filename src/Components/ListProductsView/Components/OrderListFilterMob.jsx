import React from "react";

const OrderListFilterMob = ({
  setOrderListMobile,
  orderListMobile,
  setFilterMobile,
  filterMobile,
  valueOrder,
  filters,
  handleFilterChange,
}) => {
  return (
    <div className="flex gap-6 mb-10 lg:hidden">
      <button
        className="flex items-center justify-center p-2 gap-2 w-1/2 border lg:hidden"
        onClick={() => setFilterMobile(!filterMobile)}
      >
        <p className="text-lg font-semibold">FILTRAR</p>
        <i className="bx bx-slider text-2xl"></i>
      </button>

      <button
        className="w-1/2 border p-2"
        onClick={() => setOrderListMobile(!orderListMobile)}
      >
        <div className="flex items-center justify-center  gap-2  w-full">
          <p className="text-lg font-semibold">ORDENAR POR: {valueOrder}</p>
          <i className="bx bx-customize text-2xl"></i>
        </div>

        <ul
          className={`flex flex-col gap-2 font-light text-base transform transition-all duration-300 max-h-0 overflow-hidden ${
            orderListMobile ? "max-h-52" : ""
          }`}
        >
          <li
            className={`cursor-pointer font-medium ${
              filters.sort === "Discount"
                ? "text-orange-500"
                : "hover:text-orange-500"
            }`}
            onClick={() => handleFilterChange("sort", "Discount")}
          >
            Descuentos
          </li>

          <li
            className={`cursor-pointer  font-medium ${
              filters.sort === "Sold"
                ? "text-orange-500"
                : "hover:text-orange-500"
            }`}
            onClick={() => handleFilterChange("sort", "Sold")}
          >
            Ventas
          </li>

          <li
            className={`cursor-pointer  font-medium ${
              filters.sort === "Rating"
                ? "text-orange-500"
                : "hover:text-orange-500"
            }`}
            onClick={() => handleFilterChange("sort", "Rating")}
          >
            Mejores Calificados
          </li>

          <li
            className={`cursor-pointer  font-medium ${
              filters.sort === "Last"
                ? "text-orange-500"
                : "hover:text-orange-500"
            }`}
            onClick={() => handleFilterChange("sort", "Last")}
          >
            Últimos Agregados
          </li>
        </ul>
      </button>
    </div>
  );
};

export default OrderListFilterMob;
