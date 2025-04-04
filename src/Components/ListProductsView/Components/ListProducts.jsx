import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAxios } from "../../Hooks/useAxios";
import Loading from "../../Loading";

const ListProducts = ({
  setProducts,
  setFilteredProducts,
  filteredProducts,
  loadingPro,
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
    <section>
      <div>
        {loadingPro === true ? (
          <Loading />
        ) : (
          <div className="mt-10 lg:mt-0 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-16">
            {filteredProducts.map((product, index) => {
              return (
                <div className="relative flex justify-center" key={product.id || index}>
                  {filters.sort === "best_rated" && (
                    <div className="bg-black text-[#fea401] z-20 absolute top-[0%] right-0  flex items-center justify-center gap-1 p-2 rounded-bl-xl border-none">
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
                  <ProductCard
                    product={product}
                    className="mx-5"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="my-10 flex justify-center text-[#deecfb]">
        {loading ? (
          <Loading />
        ) : nexPage ? (
          <button
            onClick={loadProducts}
            className="p-4 border uppercase font-semibold"
          >
            Ver Más
          </button>
        ) : (
          <p className="text-gray-500">No hay más productos</p>
        )}
      </div>
    </section>
  );
};

export default ListProducts;
