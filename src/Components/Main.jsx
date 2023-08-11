
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
      <h1 className="title pt-4">Welcome to the Smartphone Store</h1>
      <div className="filters my-4">
      <select
          className="price-filter"
          value={filterPrice}
          onChange={handlePriceFilterChange}
        >
          <option value="">All Prices</option>
          <option value="600">Up to $600</option>
          <option value="800">Up to $800</option>
          <option value="1000">Up to $1000</option>
          <option value="1200">Up to $1200</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="notebooks">Notebooks</option>
          <option value="accessories">Accessories</option>
          <option value="others">Others</option>
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
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Price: ${product.price.toFixed(2)}
                </p>
                <button
                  className="btn-addCart"
                  style={{ backgroundColor: isProductInCart ? 'red' : '#4c7aaf' }} onClick={() => {
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