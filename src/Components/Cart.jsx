import { useState } from "react";
import { useCart } from "./Hooks/useCart";
import "./Cart.css";
import { CartIcon } from "./Icons/Icons";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const { cart, clearCart, removeFromCart, addToCart, getTotalPrice } =
    useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePay = () => {
    navigate("/formCompra");
  };

  return (
    <>
      <button onClick={openModal} className="cart-button">
        <CartIcon />
        {cart.length}
      </button>

      {isModalOpen && (
        <div className="modal-overlay row">
          <div className="rounded modalConten col-5 text-light">
            <h3 className="title-modal text-center pt-3">Mi Carrito</h3>
            <hr />
            {cart.length === 0 ? (
              <p className="text-center fs-5">
                Aun no has cargado ningun producto 😰
              </p>
            ) : (
              <>
                <ul className="p-0">
                  {cart.map((product) => (
                    <li key={product.id}>
                      <div className="cartModal d-flex mt-3">
                        <img
                          className="img-modal"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="div-contenido ms-2">
                          <p className="name-modal">{product.name}</p>
                          <div className="div-price">
                          <p className="price-modal">${product.price}</p>
                          <button
                            className="rounded quantity-button"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                          <span className="quantity text-light">
                            {product.quantity}
                          </span>
                          <button
                            className="rounded quantity-button"
                            onClick={() => removeFromCart(product)}
                          >
                            -
                          </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="d-flex">
                <h5 className="mt-2 totalPrice fs-4">
                    Total: ${getTotalPrice()}
                  </h5>
                  <button className="trashButton" onClick={clearCart}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="trash-icon"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                    
                  </button>
                </div>
                <hr />
                <div className="text-center">
                  <button
                    onClick={handlePay}
                    className="payButton"
                  >
                    COMPRAR
                  </button>
                </div>
              </>
            )}
            <button className="close-button mt-2" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="close-icon"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
