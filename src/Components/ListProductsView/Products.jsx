import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAxios } from "../Hooks/useAxios";

import OrderListFilter from "./Components/OrderListFilter";
import OrderListFilterMob from "./Components/OrderListFilterMob";
import Filters from "./Components/Filters";
import ListProducts from "./Components/ListProducts";

const Products = () => {
  const api = useAxios();
  const { categoryId } = useParams();
  const [isDeletingFilters, setIsDeletingFilters] = useState(false);
  const [loadingPro, setLoadingPro] = useState(false);
  const [orderListMobile, setOrderListMobile] = useState(false);
  const [filterMobile, setFilterMobile] = useState(false);
  const [valueOrder, setValueOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandsMenu, setBrandsMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [nexPage, setNexPage] = useState("");
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
      setLoadingPro(true);

      const params = new URLSearchParams();

      params.append("category", categoryId);

      if (filters.brand !== "All") params.append("brand", filters.brand);
      if (filters.min_price) params.append("min_price", filters.min_price);
      if (filters.max_price) params.append("max_price", filters.max_price);
      if (filters.sort) params.append("sort", filters.sort);

      const response = await api.get(`/products/?${params.toString()}`);
      if (response.data.next) {
        setNexPage(response.data.next);
      } else {
        setNexPage("");
      }

      if (response.status === 200) {
        setProducts(response.data.results);
        setFilteredProducts(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  useEffect(() => {
    if (
      filters.brand !== "All" ||
      filters.brand !== "Default" ||
      filters.min_price > 0 ||
      filters.max_price > 0 ||
      filters.currentMinPrice > 0
    ) {
      fetchProduct();
    }
  }, [
    filters.sort,
    filters.brand,
    filters.min_price,
    filters.max_price,
    categoryId,
  ]);

  const handleFilterChange = (key, value, order) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setValueOrder(order);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams);
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
  };

  useEffect(() => {
    if (isDeletingFilters) {
      fetchProduct();
      setIsDeletingFilters(false);
    }
  }, [isDeletingFilters]);
console.log(filters);

  return (
    <>
      <div className="mt-10 w-full h-auto px-6 md:px-14 lg:px-24">
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
          {/* ------ORDEN LIST BUTTON MOB----- */}
          <OrderListFilterMob
            setOrderListMobile={setOrderListMobile}
            orderListMobile={orderListMobile}
            setFilterMobile={setFilterMobile}
            filterMobile={filterMobile}
            valueOrder={valueOrder}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />

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
            loadingPro={loadingPro}
          />

          {/* ------PRODUCTS LIST----- */}
          <ListProducts
            setProducts={setProducts}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            nexPage={nexPage}
            setNexPage={setNexPage}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
