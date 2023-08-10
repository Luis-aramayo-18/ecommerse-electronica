import { useState } from "react";
import { useCart } from "./Hooks/useCart";

import "./Cart.css";
import { CartIcon } from "./Icons/Icons";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const { cart, clearCart, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePay = () => {
    navigate('/formCompra')
  };

  return (
    <>
      <button onClick={openModal} className="cart-button">
        <CartIcon />
        {cart.length}
      </button>

      {isModalOpen && (
        <div className="modal-overlay row">
          <div className="modalConten col-5 text-light">
          <h3 className="text-center pt-3">Mi Carrito</h3>
          <hr />
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <div className="cartModal d-flex mt-2">
                  <img
                    className="w-25 h-25"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="ms-2 mt-2">
                    <p>{product.name}</p>
                    <button
                      className="rounded quantity-button"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <span className="quantity text-light">{quantity}</span>
                    <button
                      className="rounded quantity-button"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                    </div>
                    <div className="divPrice mt-2">
                    <p>${product.price}</p>
                    <button>Borrar</button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h5>Total: </h5>
          <hr />
          <div className="text-center">
          <button onClick={handlePay} className="mb-3 w-50 p-2 bg-success">COMPRAR</button>
          </div>
          <button className="close-button mt-2" onClick={closeModal}>
            Cerrar
          </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
