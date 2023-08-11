
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons/Icons";
import Cart from "./Cart";

import "./Product.css";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart, removeFromCart, cart, incrementQuantity, decrementQuantity, quantity } = useCart();

  const product = location.state;

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const isProductInCart = checkProductInCart(product)

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
    <Cart/>

    <div className="container mt-5">
      <nav aria-label="breadcrumb" className="navigation-index mb-5">
        <ol className="breadcrumb text-center">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item text-light">{product.category}</li>
          <li className="breadcrumb-item text-light">{product.name}</li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="text start col-md-7">
          <img
            className="w-100 h-100 rounded"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="col-md-4">
          <h2 className="mb-3 fs-1 text-light">{product.name}</h2>
          <p className="mt-4 text-light">{product.description}</p>
          <h2 className="mt-4 text-light">${product.price}</h2>
          <div className="quantity-container mt-4">
            <h4 className="me-3 text-light">Cantidad</h4>
            <button
              className="rounded quantity-button"
              onClick={()=>decrementQuantity(product)}
            >
              -
            </button>
            <span className="quantity text-light">{quantity}</span>
            <button
              className="rounded quantity-button"
              onClick={()=>incrementQuantity(product)}
            >
              +
            </button>
          </div>
          <button
            className="rounded mt-5 add-to-cart-button"
            style={{ backgroundColor: isProductInCart ? 'red' : '#4c7aaf' }}
            onClick={() => {
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
          <button className="rounded mt-3 go-home-button" onClick={handleClick}>
            Volver
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Product;
