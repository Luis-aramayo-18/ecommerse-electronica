
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons/Icons";

import data from '../data.json'
import Cart from "./Cart";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product.css";
import Slider from "react-slick";


const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart, removeFromCart, cart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = location.state;

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const isProductInCart = checkProductInCart(product)

  const handleClick = () => {
    navigate("/");
  };

  const handleClickProductRelated =(product)=>{
    navigate(`/product/${product.id}`,{state: product})
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const getRelatedProducts = () => {
    return data.filter(
      (relatedProduct) =>
        relatedProduct.price <= product.price + 100&&
        relatedProduct.price >= product.price - 100 && // Adjust the range as needed
        relatedProduct.category === product.category
    ); console.log(getRelatedProducts)
  };

  useEffect(() => {
    // Set related products in the state
    const related = getRelatedProducts();
    console.log(related)
    setRelatedProducts(related);
  }, [product]);

  return (
    <>
    <Cart/>

    <div className="container mt-5">
      <nav aria-label="breadcrumb" className="navigation-index mb-5">
        <ol className="breadcrumb text-center justify-content-center">
          <li className="breadcrumb-item">
            <Link className="text-danger" to="/">Home</Link>
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
              onClick={()=>removeFromCart(product)}
            >
              -
            </button>
            <span className="quantity text-light">
            {
            cart.find(item => item.id === product.id)?.quantity || 0
            }
            </span>
            <button
              className="rounded quantity-button"
              onClick={()=>addToCart(product)}
            >
              +
            </button>
          </div>
          <button
            className="rounded mt-5 add-to-cart-button"
            style={{ backgroundColor: isProductInCart ? 'red' : '' }}
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

      <div className="mt-5">
      <h3 className="mb-3 text-light">Tambien podria interesarte</h3>
      <Slider {...settings}>
      {relatedProducts.map((product) => (
        <div onClick={()=>handleClickProductRelated(product)} className="card-product-related px-3 rounded" key={product.id}>
          <img className="card-img-top h-100" src={product.image} alt={product.name} />
          <div className="card-body">
          <h3 className="card-title text-light fw-normal mb-1">{product.name}</h3>
          <p className="card-text text-light fw-normal">{product.description}</p>
          <p className="text-light fw-normal">${product.price}</p>
          </div>
        </div>
      ))}
    </Slider>
      </div>
    </div>
    </>
  );
};

export default Product;
