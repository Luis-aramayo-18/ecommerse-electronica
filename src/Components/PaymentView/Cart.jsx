import { useState } from "react";
import { useCart } from "../Hooks/useCart";
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
      <button
        onClick={openModal}
        className="flex flex-col justify-center items-center relative"
      >
        {cart.length > 0 && (
          <span className="absolute top-0 -left-3 bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.length}
          </span>
        )}
        <i className="bx bxl-shopify text-black text-3xl sm:text-4xl md:text-5xl"></i>
      </button>

      <div
        className={`${
          isModalOpen
            ? "fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
            : ""
        }`}
      >
        <div
          className={`${
            isModalOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col items-start fixed right-0 top-0 z-50 p-6 bg-orange-500 w-6/6 sm:w-4/6 md:w-3/6 lg:w-3/6 xl:w-2/5 2xl:w-2/5 h-screen transform transition-transform duration-300`}
        >
          <h3 className="text-2xl font-semibold">Mi Carrito</h3>
          <hr className="text-white bg-white mb-6" />
          {cart.length === 0 ? (
            <p className="text-center fs-5">
              Aun no has cargado ningun producto 😰
            </p>
          ) : (
            <>
              <ul className="p-0 w-full overflow-y-scroll scroll-smooth">
                {cart.map((product) => (
                  <li key={product.id}>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-28 m-2">
                        <img
                          className="w-full object-cover"
                          src={product.images[0].image}
                          alt={product.name}
                        />
                      </div>

                      <div>
                        <p className="text-lg font-semibold">{product.name}</p>
                        <div>
                          <div>
                            <p className="text-lg font-semibold">
                              %{product.discount_percentage}
                              <span className="uppercase text-base font-medium ms-2">
                                off
                              </span>
                            </p>
                            <p
                              className={`${
                                product.is_on_sale
                                  ? "line-through text-sm font-light"
                                  : ""
                              }`}
                            >
                              $
                              {new Intl.NumberFormat("es-CO", {
                                style: "decimal",
                                minimumFractionDigits: 0,
                              }).format(product.price)}
                            </p>
                          </div>
                          <p
                            className={`${
                              product.is_on_sale ? "font-bold mt-2" : ""
                            }`}
                          >
                            <span className="text-sm font-light">
                              Precio Final:
                            </span>{" "}
                            $
                            {new Intl.NumberFormat("es-CO", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                            }).format(product.final_price)}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                            <button
                              className="rounded-lg border w-8 h-8 flex items-center justify-center"
                              onClick={() => addToCart(product)}
                            >
                              +
                            </button>
                            <span className="">{product.quantity}</span>
                            <button
                              className="rounded-lg border w-8 h-8 flex items-center justify-center"
                              onClick={() => removeFromCart(product)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="w-full m-0 mt-6 mb-5" />

              <div className="flex items-center w-full justify-between">
                <h5 className="text-xl font-semibold ms-2">
                  <span className="text-xl font-light">Total:</span> ${getTotalPrice()}
                </h5>
                <button onClick={clearCart}>
                  <i className="bx bx-trash-alt text-2xl"></i>
                </button>
              </div>

              <div className="mt-5 w-full p-4 text-center border">
                <button onClick={handlePay}>COMPRAR</button>
              </div>
            </>
          )}
          <button className="absolute top-5 right-5" onClick={closeModal}>
            <i className="bx bx-x text-3xl"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
