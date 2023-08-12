import { useState } from "react";
import { useCart } from "./Hooks/useCart";
import "./Cart.css";
import { CartIcon } from "./Icons/Icons";
import { useNavigate } from "react-router-dom";


export function Cart() {
  const { cart, clearCart, removeFromCart, addToCart,getTotalPrice } = useCart();
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
            <h3 className="text-center pt-3">Mi Carrito</h3>
            <hr />
            {
            cart.length===0
            ?(<p className="text-center fs-5">Aun no has cargado ningun producto 😰</p>)
            :(
              <>
                <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  <div className="cartModal d-flex mt-2">
                    <img
                      className="w-50 h-50"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="ms-2 mt-2">
                      <p className="fs-4">{product.name}</p>
                      <p className="fs-5">${product.price}</p>
                      <button
                        className="rounded quantity-button"
                        onClick={() => addToCart(product)}>
                        +
                      </button>
                      <span className="quantity text-light">
                        {product.quantity}
                      </span>
                      <button
                        className="rounded quantity-button"
                        onClick={() => removeFromCart(product)}>
                        -
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex">
            <button className="btn btn-light ms-4 mt-2" onClick={clearCart}>
            <ion-icon name="trash-outline"></ion-icon>
            </button>
            <h5 className="mt-2 totalPrice fs-4">Total: ${getTotalPrice()}</h5>
            </div>
            <hr />
            <div className="text-center">
              <button onClick={handlePay} className="mb-3 w-50 p-2 bg-success">
                COMPRAR
              </button>
            </div>
              </>
            )
            }
            <button className="btn btn-warning close-button mt-2" onClick={closeModal}>
            <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
