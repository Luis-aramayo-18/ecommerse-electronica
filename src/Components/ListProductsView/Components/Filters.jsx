import React from "react";

const Filters = ({
  filterMobile,
  setFilterMobile,
  filteredProducts,
  filters,
  handleFilterChange,
  brandsMenu,
  setBrandsMenu,
  products,
  deleteFilters,
}) => {

  // console.log(filters.minPrice, filters.maxPrice, filters.currentMinPrice );
  
  return (
    <>
      <div
        className={`${
          filterMobile
            ? "fixed z-10 h-full w-full top-0 left-0 bg-black bg-opacity-50 lg:hidden"
            : ""
        }`}
      ></div>

      <section
        className={`backdrop-blur-md bg-black/30 border-e-2 border-white lg:border-0 fixed left-0 top-0 z-40 h-full w-[75%] md:w-[60%] lg:z-0 lg:backdrop-blur-0 lg:p-0 lg:bg-transparent lg:relative lg:w-[25%] lg:translate-x-0 transform transition-transform duration-300 ${
          filterMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-black text-white p-6 lg:p-0 lg:bg-transparent lg:text-black flex items-end gap-2">
          <h2 className="text-2xl font-bold">FILTRAR:</h2>
          <span className="font-medium">
            Unidades: {filteredProducts.length}
          </span>
          <span
            className="lg:hidden absolute right-0 me-5 cursor-pointer"
            onClick={() => setFilterMobile(!filterMobile)}
          >
            <i className="bx bx-x text-3xl"></i>
          </span>
        </div>

        <div className="p-6 lg:p-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 mt-3 text-white lg:text-black">
              <p className="text-2xl font-semibold ">Precio</p>
              <label className="flex flex-col gap-2 text-lg text-white/80 lg:text-black">
                A partir de:
              </label>
            </div>

            <i className="bx bxs-chevron-right text-2xl text-white lg:text-black"></i>
          </div>
          <input
            type="range"
            className="w-full mt-3"
            step={10000}
            min={filters.minPrice}
            max={filters.maxPrice}
            value={filters.currentMinPrice}
            onChange={(e) =>
              handleFilterChange("currentMinPrice", e.target.value)
            }
          />

          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/80 lg:text-black">
              $
              {new Intl.NumberFormat("es-CO", {
                style: "decimal",
                minimumFractionDigits: 0,
              }).format(filters.currentMinPrice)}
            </span>
            <span className="text-sm font-medium text-white/80 lg:text-black">
              $
              {new Intl.NumberFormat("es-CO", {
                style: "decimal",
                minimumFractionDigits: 0,
              }).format(filters.maxPrice)}
            </span>
          </div>
        </div>

        <div
          className="border-b py-4 mb-2 border-white lg:border-black cursor-pointer m-6 lg:m-0"
          onClick={() => setBrandsMenu(!brandsMenu)}
        >
          <div className="flex items-center justify-between text-white lg:text-black">
            <h4 className="text-xl font-semibold">Marcas:</h4>
            <i
              className={`bx bxs-chevron-right text-2xl transition-all duration-100 ${
                brandsMenu ? "rotate-90" : ""
              }`}
            ></i>
          </div>

          <ul
            className={`flex flex-col gap-2 mt-2 max-h-0 overflow-hidden transition-all duration-300 text-white/80 lg:text-black ${
              brandsMenu ? "max-h-52" : ""
            }`}
          >
            {[
              ...new Set(products.map((product) => product.brand_detail.name)),
            ].map((brand) => (
              <li
                key={brand}
                onClick={() => handleFilterChange("brand", brand)}
                className={`cursor-pointer font-medium transition-all duration-100 hover:text-blue-600 ${
                  filters.brand === brand ? "text-blue-600" : ""
                }`}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 lg:p-0 mt-4">
          <button
            className="border border-white p-2 rounded-2xl transition-all duration-100 lg:hover:bg-red-300 w-full"
            onClick={deleteFilters}
          >
            <i className="bx bxs-trash text-2xl text-white lg:text-black"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default Filters;
