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
  setNexPage
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
    <section className="lg:ms-10">
      <div>
        {loadingPro === true ? (
          <Loading />
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 md:mt-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {filteredProducts.map((product, index) => {
              return (
                <ProductCard
                  key={product.id || index}
                  product={product}
                  className="mx-5"
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="my-10 flex justify-center">
        {loading ? (
          <Loading />
        ) : nexPage === null ? (
          <p className="text-gray-500">No hay más productos</p>
        ) : (
          <button
            onClick={loadProducts}
            className="p-4 border uppercase font-semibold"
          >
            Ver Más
          </button>
        )}
      </div>
    </section>
  );
};

export default ListProducts;
