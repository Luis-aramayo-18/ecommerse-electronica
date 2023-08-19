
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
    window.scrollTo(0, 0);
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  useEffect(() => {
    const getRelatedProducts = () => {
    return data.filter(
      (relatedProduct) =>
        relatedProduct.price <= product.price + 250 &&
        relatedProduct.price >= product.price - 250 &&
        relatedProduct.category === product.category
    );
  };

  const related = getRelatedProducts();
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
            className="w-100 h-auto rounded"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="col-md-4 ms-4">
          <h2 className="product-name mb-3 fs-1 text-light">{product.name}</h2>
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
      <h3 className="mb-4 text-light">Tambien podria interesarte</h3>
      <Slider {...settings}>
      {relatedProducts.map((product) => (
        <div className="div-related" key={product.id}>
        <div className="div-hijo-related mt-2" onClick={()=>handleClickProductRelated(product)} key={product.id}>
          <img className="img-related" src={product.image} alt={product.name} />
          <div className="card-body">
          <h3 className="name-related card-title text-light fw-normal mb-1">{product.name}</h3>
          <p className="price-related text-light fs-4 fw-normal">${product.price}</p>
          </div>
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
