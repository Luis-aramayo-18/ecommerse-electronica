import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAxios } from "../Hooks/useAxios";

import OrderListFilter from "./Components/OrderListFilter";
import Filters from "./Components/Filters";
import ListProducts from "./Components/ListProducts";

const Products = () => {
  const api = useAxios();
  const { categoryId } = useParams();
  const [isDeletingFilters, setIsDeletingFilters] = useState(false);
  const [orderListMobile, setOrderListMobile] = useState(false);
  const [filterMobile, setFilterMobile] = useState(false);
  const [valueOrder, setValueOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandsMenu, setBrandsMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [brands, setBrands] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
    seeMore: false,
  });
  const [filters, setFilters] = useState({
    max_price: "",
    min_price: "",
    currentMinPrice: searchParams.get("currentMinPrice")
      ? searchParams.get("currentMinPrice")
      : "",
    brand: searchParams.get("brand") ? searchParams.get("brand") : "All",
    sort: searchParams.get("sort") ? searchParams.get("sort") : "Default",
  });

  const fetchProduct = async () => {
    try {
      setLoading((prev) => ({ ...prev, products: true, seeMore: true }));
      const params = new URLSearchParams();

      params.append("category", categoryId);

      if (filters.brand !== "All") params.append("brand", filters.brand);
      if (filters.min_price) params.append("min_price", filters.min_price);
      if (filters.max_price) params.append("max_price", filters.max_price);
      if (filters.sort) params.append("sort", filters.sort);

      const response = await api.get(`/products/?${params.toString()}`);
      if (response.data.next) {
        const nextUrl = response.data.next;

        const urlObj = new URL(nextUrl);
        let relativeUrl = urlObj.pathname + urlObj.search;

        if (relativeUrl.startsWith("/api/")) {
          relativeUrl = relativeUrl.replace("/api", "");

          setNextPage(relativeUrl);
        }
      } else {
        setNextPage(null);
      }

      if (response.status === 200) {
        setProducts(response.data.results);
        setFilteredProducts(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, products: false, seeMore: false }));
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }));
      const response = await api.get(`/brands/?category=${categoryId}`);

      if (response.status === 200) {
        setBrands(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();

    if (filters.sort === "best_selling") {
      setValueOrder("Mas vendido");
    } else if (filters.sort === "best_rated") {
      setValueOrder("Mejores calificados");
    } else if (filters.sort === "latest") {
      setValueOrder("Últimos");
    } else if (filters.sort === "discount") {
      setValueOrder("Descuentos");
    } else {
      setValueOrder("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.sort,
    filters.brand,
    filters.min_price,
    filters.max_price,
    categoryId,
  ]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams);
    setFilterMobile(false);
  };

  const deleteFilters = (e) => {
    e.preventDefault();
    setIsDeletingFilters(true);
    setFilters({
      min_price: 0,
      max_price: 0,
      currentMinPrice: 0,
      brand: "All",
      sort: "Default",
    });
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete("brand");
      newParams.delete("min_price");
      newParams.delete("max_price");
      newParams.delete("sort");
      return newParams;
    });
    setValueOrder("");
    setFilterMobile(!filterMobile);
  };

  useEffect(() => {
    if (isDeletingFilters) {
      fetchProduct();
      setIsDeletingFilters(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeletingFilters]);

  return (
    <>
      <div className="mt-10 w-full h-auto px-4 md:px-14 lg:px-24">
        {/* ------ORDER LIST BUTTON----- */}
        <OrderListFilter
          setOrderListMobile={setOrderListMobile}
          orderListMobile={orderListMobile}
          valueOrder={valueOrder}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />

        {/* ------PRODUCTS----- */}
        <div className="overflow-hidden lg:relative lg:flex lg:justify-between">
          {/* ------FILTERS----- */}
          <Filters
            filterMobile={filterMobile}
            setFilterMobile={setFilterMobile}
            filteredProducts={filteredProducts}
            filters={filters}
            handleFilterChange={handleFilterChange}
            brandsMenu={brandsMenu}
            setBrandsMenu={setBrandsMenu}
            products={products}
            deleteFilters={deleteFilters}
            loading={loading}
            isDeletingFilters={isDeletingFilters}
            brands={brands}
            valueOrder={valueOrder}
            orderListMobile={orderListMobile}
            setOrderListMobile={setOrderListMobile}
          />

          {/* ------PRODUCTS LIST----- */}
          <ListProducts
            setProducts={setProducts}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            nexPage={nextPage}
            setNexPage={setNextPage}
            filters={filters}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
