import React, { useState } from "react";
import Loading from "../../../Loading";
import { useAxios } from "../../../Hooks/useAxios";

const SoldsAdmin = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState({
    post: false,
    search: false,
    get: false,
    update: false,
    delete: false,
    seeMore: false,
  });

  const fetchOrders = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true }));
      const response = await api.get("/products/");

      if (response.status === 200) {
        setOrders(response.data.results);
        setFilteredOrders(response.data.results);
      }

      if (response.data.next) {
        const nextUrl = response.data.next;

        if (nextUrl) {
          const urlObj = new URL(nextUrl);

          let relativeUrl = urlObj.pathname + urlObj.search;

          if (relativeUrl.startsWith("/api/")) {
            relativeUrl = relativeUrl.replace("/api", "");

            setNextPage(relativeUrl);
          }
        }
      } else {
        setNextPage(null);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const handleSearchProduct = (e) => {
    const query = e.target.value;
    setSearchProduct(query);
  };

  const deleteSuggestions = () => {
    setSearchProduct("");
    setSuggestions([]);
    fetchOrders();
  };

  return (
    <div className="mt-10 w-full">
      <div className="relative flex items-center w-full lg:w-[40%]">
        <input
          type="text"
          placeholder="Ingresar ID de orden de compra"
          className="p-3 w-full bg-black/30 border placeholder:text-sm text-white border-white/25 backdrop-blur rounded-2xl"
          value={searchProduct}
          onChange={handleSearchProduct}
        />
        {loading.search ? (
          <Loading className="absolute right-4" />
        ) : suggestions.length > 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 absolute right-4 cursor-pointer text-white"
            onClick={deleteSuggestions}
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 absolute right-4 text-white"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="mt-10 px-4">
        <table className="min-w-full">
          <thead className="text-white">
            <tr className="">
              <th className="w-[10%]">Id</th>
              <th className="w-[10%]">Estado</th>
              <th className="w-[50%]">Productos</th>
              <th className="w-[10%]">Monto</th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldsAdmin;
