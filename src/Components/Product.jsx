import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Product.css"
import { useCart } from "./Hooks/useCart";

const Product = () => {
  const location = useLocation();

  const { cart, clearCart, addToCart } = useCart()

  const product = location.state;

  
   // Quantity state
   const [quantity, setQuantity] = useState(1);

   // Handler for incrementing the quantity
   const incrementQuantity = () => {
     setQuantity((prevQuantity) => prevQuantity + 1);
   };
 
   // Handler for decrementing the quantity
   const decrementQuantity = () => {
     if (quantity > 1) {
       setQuantity((prevQuantity) => prevQuantity - 1);
     }
   };

   // Handler for adding the product to the cart
  const handleAddToCart = () => {
    // Implement your logic for adding the product to the cart here
    console.log(`Added ${quantity} ${product.name}(s) to the cart`);
  };
  

  return (
    <div className="container mt-5">
      <div className="justify-content-center">
      <nav aria-label="breadcrumb" className="navigation-index mb-5">
        <ol className="breadcrumb text-center">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item text-light">
            {product.category}
          </li>
          <li className="breadcrumb-item text-light">
            {product.name}
          </li>
        </ol>
      </nav>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-7">
          <img className="img-fluid rounded" src={product.image} alt={product.name} />
        </div>
        <div className="col-md-5">
          <h2 className="mb-3 fs-1 text-light">{product.name}</h2>
          <p className="mt-4 text-light">{product.description}</p>
          <h2 className="mt-2 text-light">${product.price}</h2>
          <div className="quantity-container mt-4">
            <h4 className="me-3 text-light">Cantidad</h4>
            <button className="rounded quantity-button" onClick={decrementQuantity}>-</button>
            <span className="quantity text-light">{quantity}</span>
            <button className="rounded quantity-button" onClick={incrementQuantity}>+</button>
          </div>
          <button className="rounded mt-5 add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
