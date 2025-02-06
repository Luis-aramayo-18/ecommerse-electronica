import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAxios } from "../Hooks/useAxios";

import OrderListFilter from "./Components/OrderListFilter";
import OrderListFilterMob from "./Components/OrderListFilterMob";
import Filters from "./Components/Filters";
import ListProducts from "./Components/ListProducts";
import { set } from "react-hook-form";
import Loading from "../Loading";

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

        updateFilters(min, max);
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

  const handleFilterChange = (key, value, order) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setValueOrder(order);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams);
  };

  const deleteFilters = () => {
    setIsDeletingFilters(true);
    setFilters({
      minPrice: 0,
      maxPrice: 0,
      currentMinPrice: 0,
      brand: "All",
      sort: "Default",
    });
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete("brand");
      newParams.delete("currentMinPrice");
      newParams.delete("sort");
      return newParams;
    });
    setValueOrder("");
  };

  const updateFilters = (min, max, newCurrentMinPrice) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: min,
      maxPrice: max,
      currentMinPrice: newCurrentMinPrice ?? prevFilters.currentMinPrice,
      sort: searchParams.get("sort") || "Default",
      brand: searchParams.get("brand") || "All",
    }));
  };

  const orderByOffers = async () => {
    const category = parseFloat(categoryId);

    try {
      setLoadingPro(true);

      const offerProducts = await api.get(
        `/products/on-sale-products/?category=${category}`
      );

      if (offerProducts) {
        const prices = offerProducts.data.results.map((product) =>
          product.final_price ? product.final_price : product.price
        );

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        updateFilters(min, max);
        setFilteredProducts(offerProducts.data.results);
        setProducts(offerProducts.data.results);

        if (offerProducts.data.next) {
          setNexPage(offerProducts.data.next)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  const orderBySales = async () => {
    const category = parseFloat(categoryId);

    try {
      setLoadingPro(true);

      const salesProducts = await api.get(
        `/products/sales-products/?category=${category}`
      );

      if (salesProducts) {
        const prices = salesProducts.data.results.map((product) =>
          product.final_price ? product.final_price : product.price
        );

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        updateFilters(min, max);
        setFilteredProducts(salesProducts.data.results);
        setProducts(salesProducts.data.results);

        if (salesProducts.data.next) {
          setNexPage(salesProducts.data.next)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  const orderByRating = async () => {
    const category = parseFloat(categoryId);

    try {
      setLoadingPro(true);

      const ratesProducts = await api.get(
        `/products/rating-products/?category=${category}`
      );
      
      if (ratesProducts) {
        const prices = ratesProducts.data.results.map((product) =>
          product.final_price ? product.final_price : product.price 
        );

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        updateFilters(min, max);
        setFilteredProducts(ratesProducts.data.results);
        setProducts(ratesProducts.data.results);

        if (ratesProducts.data.next) {
          setNexPage(ratesProducts.data.next)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  const orderByLastProduct = async () => {
    const category = parseFloat(categoryId);

    try {
      setLoadingPro(true);

      const lastProducts = await api.get(
        `/products/latest-products/?category=${category}`
      );      
            
      if (lastProducts) {
        const prices = lastProducts.data.results.map((product) =>
          product.final_price ? product.final_price : product.price
        );

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        updateFilters(min, max);
        setFilteredProducts(lastProducts.data.results);
        setProducts(lastProducts.data.results);

        if (lastProducts.data.next) {
          setNexPage(lastProducts.data.next)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPro(false);
    }
  };

  useEffect(() => {
    switch (filters.sort) {
      case "Discount":
        orderByOffers();
        break;
      case "Sold":
        orderBySales();
        break;
      case "Rating":
        orderByRating();
        break;
      case "Last":
        orderByLastProduct();
        break;
      default:
        break;
    }
  }, [filters.sort]);

  useEffect(() => {
    let filtered = products;

    if (filters.brand !== "All") {
      filtered = filtered.filter(
        (product) => product.brand_detail.name === filters.brand
      );
    }

    let min = 0;
    let max = 0;
    if (filtered.length > 0) {
      const prices = filtered.map(
        (product) => product.final_price ?? product.price
      );
      min = Math.min(...prices);
      max = Math.max(...prices);
    }

    const newCurrentMinPrice =
      filters.brand !== "All" ? min : filters.currentMinPrice;

    updateFilters(min, max, newCurrentMinPrice);

    filtered = filtered.filter((product) => {
      const price = product.final_price ?? product.price;
      return price >= newCurrentMinPrice;
    });

    setFilteredProducts(filtered);
  }, [filters.brand, filters.currentMinPrice, products]);

  useEffect(() => {
    if (isDeletingFilters) {
      fetchProduct();
      setIsDeletingFilters(false);
    }
  }, [isDeletingFilters]);
  

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
