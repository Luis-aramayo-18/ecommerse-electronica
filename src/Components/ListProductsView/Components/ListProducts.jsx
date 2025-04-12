import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAxios } from "../../Hooks/useAxios";
import Loading from "../../Loading";

const ListProducts = ({
  setProducts,
  setFilteredProducts,
  filteredProducts,
  nexPage,
  setNexPage,
  filters,
}) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    if (nexPage === null) {
      return <p>no hay mas productos</p>;
    }

    try {
      setLoading(true);
      const response = await api.get(nexPage);

      if (response.status === 200) {
        const updatesProducts = response.data.results;

        if (updatesProducts.length > 0) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...updatesProducts.filter(
              (p) => !prevProducts.some((prev) => prev.id === p.id)
            ),
          ]);
          setFilteredProducts((prevProducts) => [
            ...prevProducts,
            ...updatesProducts.filter(
              (p) => !prevProducts.some((prev) => prev.id === p.id)
            ),
          ]);

          const next = response.data.next;

          if (next === "null") {
            console.log("hola");
          } else {
            setNexPage(response.data.next);
          }
        }
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="lg:me-2 mt-10 lg:mt-0 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {filteredProducts.map((product, index) => {
          return (
            <div
              className="relative rounded-2xl flex justify-center shadow-md shadow-gray-500 overflow-hidden"
              key={product.id || index}
            >
              {filters.sort === "best_rated" && (
                <div className="bg-black text-[#fea401] absolute top-[0%] right-0  flex items-center justify-center gap-1 p-2 rounded-bl-xl border-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-xs font-bold">
                    {product.average_rating.toFixed(1)}
                  </p>
                </div>
              )}
              {<ProductCard product={product} button className="lg:px-4 lg:py-6 p-4 bg-black/70 backdrop-blur" /> || (
                <Loading />
              )}
            </div>
          );
        })}
      </div>

      <div className="my-10 flex justify-center">
        {nexPage === null ? (
          <p className="text-gray-500">No hay más productos</p>
        ) : (
          <button
            onClick={loadProducts}
            className="w-[110px] h-[40px] border rounded-2xl bg-black/70 backdrop-blur-sm relative"
          >
            {loading ? (
              <Loading />
            ) : (
              <p className="uppercase font-semibold text-xs text-white">
                Ver mas
              </p>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default ListProducts;
