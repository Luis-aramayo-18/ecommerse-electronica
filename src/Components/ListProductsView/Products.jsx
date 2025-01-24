import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAxios } from "../Hooks/useAxios";

import OrderListFilter from "./Components/OrderListFilter";
import OrderListFilterMob from "./Components/OrderListFilterMob";
import Filters from "./Components/Filters";
import ListProducts from "./Components/ListProducts";
import { set } from "react-hook-form";

const Products = () => {
  const api = useAxios();
  const { categoryId } = useParams();

  const [loadingPro, setLoadingPro] = useState(false);
  const [orderListMobile, setOrderListMobile] = useState(false);
  const [filterMobile, setFilterMobile] = useState(false);
  const [valueOrder, setValueOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandsMenu, setBrandsMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    maxPrice: 0,
    minPrice: 0,
    currentMinPrice: searchParams.get("currentMinPrice")
      ? searchParams.get("currentMinPrice")
      : 0,
    brand: searchParams.get("brand") ? searchParams.get("brand") : "All",
    sort: searchParams.get("sort") ? searchParams.get("sort") : "Default",
  });

  const fetchProduct = async () => {
    try {
      setLoadingPro(true);
      const response = await api.get(`/products/?category=${categoryId}`);

      if (response.status === 200) {
        const products = response.data.results;

        const prices = products.map((product) =>
          product.final_price ? product.final_price : product.price
        );

      
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setFilters({
          minPrice: min,
          maxPrice: max,
          currentMinPrice: searchParams.get("currentMinPrice")
            ? searchParams.get("currentMinPrice")
            : min,
          brand: searchParams.get("brand") ? searchParams.get("brand") : "All",
          sort: searchParams.get("sort") ? searchParams.get("sort") : "Default",
        });
        setProducts(products);
        setFilteredProducts(products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight
  //     ) {
  //       if (!loading) {
  //         fetchProduct();
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams);
  };

  const deleteFilters = () => {
    const prices = products.map((product) =>
      product.final_price ? product.final_price : product.price
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setValueOrder("");
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete("brand");
      newParams.delete("currentMinPrice");
      newParams.delete("sort");
      return newParams;
    });
    setFilters({
      minPrice: min || 0,
      maxPrice: max || 0,
      currentMinPrice: min || 0,
      brand: "All",
      sort: "Default",
    });
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = product.final_price
        ? product.final_price
        : product.price;

      const matchesPrice = price >= filters.currentMinPrice;

      const matchesBrand =
        filters.brand === "All" || product.brand_detail.name === filters.brand;

      return matchesPrice && matchesBrand;
    });

    setFilteredProducts(filtered);

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "Discount":
          setValueOrder("Descuento");
          const discountA = parseFloat(a.discount_percentage) || 0;
          const discountB = parseFloat(b.discount_percentage) || 0;
          return discountB - discountA;
        case "Sold":
          setValueOrder("Ventas");
          return (b.total_sold || 0) - (a.total_sold || 0);
        case "Rating":
          setValueOrder("Mejores Calificados");
          return (b.average_rating || 0) - (a.average_rating || 0);
        case "Last":
          setValueOrder("Últimos Agregados");
          orderByLastProduct();
          return 0;
        default:
          return 0;
      }
    });

    setFilteredProducts(sorted);
  }, [filters.sort, filters.currentMinPrice, filters.brand, products]);

  useEffect(() => {
    if (filters.brand !== "All") {
      const filteredByBrand = products.filter(
        (product) => product.brand_detail.name === filters.brand
      );

      const prices = filteredByBrand.map((product) =>
        product.final_price ? product.final_price : product.price
      );

      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: min || 0,
        maxPrice: max || 0,
        currentMinPrice: min || 0,
      }));
    }
  }, [filters.brand]);

  const orderByLastProduct = async () => {
    const category = parseFloat(categoryId);
    const latest = true;

    try {
      const lastProducts = await api.get(
        `/products/?category=${category}&last_products=${latest}`
      );
      if (lastProducts) {
        setFilteredProducts(lastProducts.data);
        setValueOrder("Últimos Agregados");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          />
        </div>
      </div>
    </>
  );
};

export default Products;
