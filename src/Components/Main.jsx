
import products from "../data.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons/Icons";
import Cart from "./Cart";
import "./Main.css"

const Main = () => {

  const [filterPrice, setFilterPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const navigate = useNavigate()

  const handleSeeMore = (product) =>{
    navigate(`/product/${product.id}`,{state: product})
  }

  const handlePriceFilterChange = (event) => {
    setFilterPrice(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const filteredProducts = products.filter((product) => {
    const lowerCaseName = product.name.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (filterPrice === '') {
      return (
        lowerCaseName.includes(lowerCaseSearchTerm) &&
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedCategory === '') {
      return (
        product.price <= parseFloat(filterPrice) &&
        lowerCaseName.includes(lowerCaseSearchTerm)
      );
    }

    return (
      product.price <= parseFloat(filterPrice) &&
      lowerCaseName.includes(lowerCaseSearchTerm) &&
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });
  
  return (
    <>
     <Cart/>

    <div className="container text-center">
      <h1 className="title pt-4">Bienvenidos a TecnoStore</h1>
      <div className="d-flex text-center justify-content-center filters my-4">
      <select
          className="price-filter"
          value={filterPrice}
          onChange={handlePriceFilterChange}
        >
          <option value="">Todos los precios</option>
          <option value="600">hasta $600</option>
          <option value="800">hasta $800</option>
          <option value="1000">hasta $1000</option>
          <option value="1200">hasta $1200</option>
        </select>
        <div className="div-input-search mx-3">
        <input
          type="text"
          placeholder="Buscar por el nombre"
          className="search-input text-light"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="16"
             height="16"
             fill="currentColor"
             className="bi bi-search search-icon"
             viewBox="0 0 512 512">
          <path 
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 
               44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 
               0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 
               9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 
               0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
        </svg>                                          
        </div>
        <select
          className="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Categorias</option>
          <option value="smartphones">Smartphones</option>
          <option value="notebooks">Notebooks</option>
          <option value="accessories">Accesorios</option>
          <option value="others">Otros</option>
        </select>
      </div>
      <hr />
      <div className="row">
        {filteredProducts.map((product, index) => {
          const isProductInCart = checkProductInCart(product)

          return (
          <div key={index} className="col-lg-3 col-md-6 mb-4">
            <div  className="card">
              <img
                onClick={()=> handleSeeMore(product)}
                src={product.image}
                className="card-img-top d-block mx-auto img-fluid"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Precio: ${product.price.toFixed(2)}
                </p>
                <button
                  className="btn-addCart"
                  style={{ backgroundColor: isProductInCart ? 'red' : '' }} onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }}
                >
                 {
                  isProductInCart
                  ? <RemoveFromCartIcon />
                  : <AddToCartIcon />
                  }
                </button>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Main