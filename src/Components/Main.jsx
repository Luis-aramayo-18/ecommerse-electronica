import products from "../data.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons/Icons";
import Cart from "./Cart";
import "./Main.css";

const Main = () => {
  const [maxPrice, setMaxPRice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [filterPrice, setFilterPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart, removeFromCart, cart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const lowerCaseName = product.name.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (filterPrice === "") {
      return (
        lowerCaseName.includes(lowerCaseSearchTerm) &&
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    } else if (selectedCategory === "") {
      return (
        product.price <= parseFloat(filterPrice) &&
        lowerCaseName.includes(lowerCaseSearchTerm)
      );
    } else {
      return (
        product.price >= minPrice &&
        product.price <= maxPrice &&
        lowerCaseName.includes(lowerCaseSearchTerm) &&
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
  });

  useEffect(() => {
    const heightPrice =
      Math.max(...products.map((product) => product.price)) + 1;
    const lowPrice = Math.min(...products.map((product) => product.price)) + 1;
    setMaxPRice(heightPrice);
    setMinPrice(lowPrice);
  }, []);

  const generatePriceOptions = () => {
    const priceOptions = [];

    let currentPrice = minPrice;
    while (currentPrice <= maxPrice) {
      priceOptions.push({
        value: currentPrice,
        label: `hasta $${currentPrice}`,
      });

      currentPrice += 1000;
    }

    return priceOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  const handlePriceFilterChange = (event) => {
    setFilterPrice(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleSeeMore = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <>
      <Cart />
      <div className="container text-center">
        <h1 className="title pt-4">Bienvenido a TecnoStore</h1>
        <div className="d-flex text-center justify-content-center filters my-4">
          <select
            className="price-filter"
            value={filterPrice}
            onChange={handlePriceFilterChange}
          >
            <option value="">Todos los precios</option>
            {generatePriceOptions()}
          </select>
          <div className="div-input-search mx-3">
            <input
              type="text"
              placeholder="Buscar por el nombre"
              className="search-input text-light"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search search-icon"
              viewBox="0 0 512 512"
            >
              <path
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 
               44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 
               0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 
               9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 
               0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              />
            </svg>
          </div>
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option className="option-select" value="">
              Todos los productos
            </option>
            <option className="option-select" value="smartphones">
              Smartphones
            </option>
            <option className="option-select" value="notebooks">
              Notebooks
            </option>
            <option className="option-select" value="tv">
              Smart Tv
            </option>
            <option className="option-select" value="otros">
              Otros
            </option>
          </select>
        </div>
        <hr />
        <div className="row d-flex justify-content-center">
          {filteredProducts.map((product, index) => {
            const isProductInCart = checkProductInCart(product);

            return (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className="card mx-3">
                  <img
                    onClick={() => handleSeeMore(product)}
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      Precio: ${product.price.toFixed(2)}
                    </p>
                    <button
                      className="btn-addCart"
                      style={{ backgroundColor: isProductInCart ? "red" : "" }}
                      onClick={() => {
                        isProductInCart
                          ? removeFromCart(product)
                          : addToCart(product);
                      }}
                    >
                      {isProductInCart ? (
                        <RemoveFromCartIcon />
                      ) : (
                        <AddToCartIcon />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination-buttons">
      
        </div>
      </div>
    </>
  );
};

export default Main;
