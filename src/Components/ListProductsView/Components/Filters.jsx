import React, { useEffect, useState } from "react";

const Filters = ({
  filterMobile,
  setFilterMobile,
  filteredProducts,
  filters,
  handleFilterChange,
  brandsMenu,
  setBrandsMenu,
  errorMessage,
  deleteFilters,
  isDeletingFilters,
  brands,
  orderListMobile,
  setOrderListMobile,
}) => {
  const [priceMenu, setPriceMenu] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = (e) => {
    e.preventDefault();
    if (minPrice) {
      handleFilterChange("min_price", minPrice);
    }
    if (maxPrice) {
      handleFilterChange("max_price", maxPrice);
    }
  };

  useEffect(() => {
    if (isDeletingFilters) {
      setMinPrice("");
      setMaxPrice("");
    }
  }, [isDeletingFilters]);

  return (
    <>
      <section
        className={`glass-box fixed left-0 top-0 z-50 h-full w-[75%] md:w-[60%] lg:z-0 lg:px-4 lg:py-10 lg:relative lg:w-[25%] lg:translate-x-0 transform transition-transform duration-300 ${
          filterMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-black p-6 lg:p-0 lg:bg-transparent flex items-center gap-2 text-white/90">
          <h2 className="lg:text-lg xl:text-2xl font-bold">FILTRAR:</h2>
          <span className="lg:text-sm xl:text-base font-normal mt-1 text-white/65">
            Unidades: {filteredProducts.length}
          </span>
        </div>

        <form>
          <div
            className="mt-5 py-4 mb-2 border-white cursor-pointer m-6 lg:m-0"
            onClick={() => setPriceMenu(!priceMenu)}
          >
            <div className="flex items-center justify-between text-white/75">
              <h4
                className={`lg:text-base xl:text-xl font-semibold ${
                  filters.min_price > 0 || filters.max_price > 0
                    ? "text-white"
                    : "text-white/75"
                }`}
              >
                Precio
              </h4>
              <i
                className={`bx bxs-chevron-right text-2xl transition-all duration-100 ${
                  priceMenu ? "rotate-90" : ""
                }`}
              ></i>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className={`flex flex-col gap-2 mt-2 max-h-0 overflow-hidden transition-all duration-300 text-white/80 lg:text-black ${
                priceMenu ? "max-h-52" : ""
              }`}
            >
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="min"
                  className="w-[50%] p-2 px-4 placeholder:text-white/65 bg-black/30 rounded-2xl border border-white/35"
                  onChange={(e) => setMinPrice(e.target.value)}
                  value={minPrice}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  type="number"
                  placeholder="max"
                  className="w-[50%] p-2 px-4 placeholder:text-white/65 bg-black/30 rounded-2xl border border-white/35"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  value={maxPrice}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <button
                className="p-3 mt-2 font-medium border transition-all duration-100 border-white/35 rounded-full bg-black/30 backdrop-blur text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black"
                onClick={handlePriceChange}
              >
                Filtrar
              </button>
            </div>
          </div>

          <div
            className="py-4 mb-2 border-white cursor-pointer m-6 lg:m-0"
            onClick={() => setBrandsMenu(!brandsMenu)}
          >
            <div className="flex items-center justify-between text-white/75">
              <h4
                className={`lg:text-base xl:text-xl font-semibold ${
                  filters.brand !== "All" ? "text-white" : "text-[#deecfb]"
                }`}
              >
                Marcas
              </h4>
              <i
                className={`bx bxs-chevron-right text-2xl transition-all duration-100 ${
                  brandsMenu ? "rotate-90" : ""
                }`}
              ></i>
            </div>

            <div
              className={`flex flex-col gap-2 mt-2 max-h-0 overflow-hidden transition-all duration-300 text-white/65 ${
                brandsMenu ? "max-h-52" : ""
              }`}
            >
              <ul>
                {errorMessage ? (
                  <li className="text-xs text-center text-[#fce803]">
                    {errorMessage}
                  </li>
                ) : (
                  brands.map((brand) => (
                    <li
                      key={brand.id}
                      onClick={() => handleFilterChange("brand", brand.name)}
                      className={`cursor-pointer text-sm lg:text-sm xl:text-base font-medium transition-all duration-100 hover:text-[#fce803] ${
                        filters.brand === brand.name ? "text-[#fce803]" : ""
                      }`}
                    >
                      {brand.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <hr className="w-full" />

          <div className="p-6 lg:p-0 mt-4">
            <button
              className="border flex justify-center text-white/65 border-white/35 bg-black/30 p-3 rounded-full transition-all duration-100 lg:hover:bg-[#fce803] lg:hover:text-black w-full"
              onClick={deleteFilters}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>

      {/* ------- FILTERS MOBILE ----- */}
      <section className="lg:hidden">
        <div
          className={`${
            filterMobile
              ? "fixed z-10 h-full w-full top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
              : ""
          }`}
          onClick={() => setFilterMobile(!filterMobile)}
        ></div>

        <div className="flex gap-4">
          <button
            className={`rounded-[10px] flex transition-all duration-100 items-center justify-center h-14 gap-2 w-[50%] border lg:hidden ${
              filters.brand !== "All" ||
              filters.min_price > 0 ||
              filters.max_price > 0
                ? "bg-[#fce803] text-black border-black/25"
                : "bg-black/30 text-white border-white/25"
            }`}
            onClick={() => setFilterMobile(!filterMobile)}
          >
            <p className="text-sm font-semibold">Filtrar</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>
          </button>

          <button
            className={`w-[50%] rounded-[10px] h-14 flex items-center justify-center gap-2 border p-2 relative ${
              filters.sort !== "Default"
                ? "bg-[#fce803] text-black border-black/25"
                : "bg-black/30 text-white border-white/25"
            }`}
            onClick={() => setOrderListMobile(!orderListMobile)}
          >
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-semibold">Ordenar por</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </div>

            <div
              className={` absolute rounded-2xl overflow-hidden top-full mt-2 z-20 w-full font-medium text-base transform transition-all duration-300 max-h-0 ${
                orderListMobile ? "max-h-52 shadow-lg shadow-black" : ""
              }`}
            >
              <ul className="bg-black/70 text-white/65 border border-white/25 p-4 flex flex-col w-full gap-2 backdrop-blur-md">
                <li
                  className={`cursor-pointer text-start transition-all duration-100 ${
                    filters.sort === "discount" ? "text-[#fce803]" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", "discount")}
                >
                  Descuentos
                </li>

                <li
                  className={`cursor-pointer text-start transition-all duration-100 ${
                    filters.sort === "best_selling" ? "text-[#fce803]" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", "best_selling")}
                >
                  Mas Vendido
                </li>

                <li
                  className={`cursor-pointer text-start transition-all duration-100 ${
                    filters.sort === "best_rated" ? "text-[#fce803]" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", "best_rated")}
                >
                  Mejores Calificados
                </li>

                <li
                  className={`cursor-pointer text-start transition-all duration-100 ${
                    filters.sort === "latest" ? "text-[#fce803]" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", "latest")}
                >
                  Últimos
                </li>
              </ul>
            </div>
          </button>
        </div>
      </section>
    </>
  );
};

export default Filters;
