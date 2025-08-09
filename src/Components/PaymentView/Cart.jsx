import { useEffect, useState } from "react";
import { useCart } from "../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export function Cart() {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    totalPrice,
    removeFromCart,
    updatingItemId,
    formatPrice,
  } = useCart();

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
    closeModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={openModal}
        className="flex flex-col justify-center items-center relative transition-all duration-100 lg:hover:text-white"
      >
        {cart.length > 0 && (
          <span className="absolute top-0 -left-3 bg-[#fce803] rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.length}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`size-7 ${
            cart.length > 0
              ? "text-white"
              : "text-white/75 transition-all duration-100 lg:hover:text-white"
          } `}
        >
          <path
            fillRule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`${
          isModalOpen
            ? "fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
            : ""
        }`}
        onClick={closeModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            isModalOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col items-start fixed right-0 top-0 z-50 p-6 border-l border-white/25 backdrop-blur-lg bg-black/75 w-6/6 sm:w-4/6 md:w-3/6 lg:w-[30%] h-screen transform transition-transform duration-300`}
        >
          {cart.length === 0 ? (
            <p className="text-start mt-5 text-[#deecfb]">
              Aun no has cargado ningún producto.
            </p>
          ) : (
            <>
              <ul className="p-0 w-full overflow-y-scroll scroll-smooth">
                {cart.map((product) => (
                  <li key={product.id} className="relative">
                    <div className="flex gap-2 mt-3">
                      <div className="w-28 m-2">
                        <img
                          className="w-full object-cover"
                          src={product.product_detail.images[0]}
                          alt={
                            product.product_detail.name || "Producto sin imagen"
                          }
                        />
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-white">
                          {product.product_detail.name}
                        </p>
                        <div>
                          <div className="mt-2">
                            {product.product_detail.is_on_sale ? (
                              <div>
                                <div className="flex items-center gap-2 text-white/85">
                                  <p className="text-lg font-semibold">
                                    %
                                    {product.product_detail.discount_percentage}
                                  </p>
                                  <p className="uppercase text-base font-medium">
                                    off !
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/85 text-sm font-light">
                                      Precio Original:
                                    </span>
                                    <p className="line-through text-sm font-light text-white/65">
                                      $
                                      {formatPrice(
                                        product.product_detail.price
                                      )}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-white/85 text-sm font-light">
                                      Precio Final:
                                    </span>
                                    <p className="text-[#fce803] font-medium">
                                      $
                                      {formatPrice(
                                        product.product_detail.final_price
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-white/85 text-sm font-light">
                                  Precio:{" "}
                                </span>
                                <p className="text-[#fce803] font-medium">
                                  ${formatPrice(product.product_detail.price)}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-white/65 relative">
                            <button
                              className="rounded-lg border border-white/55 transition-all duration-100 group hover:border-white w-8 h-8 flex items-center justify-center"
                              onClick={() => incrementQuantity(product)}
                              disabled={
                                product.product_detail.id === updatingItemId
                              }
                            >
                              <p className="transition-all duration-100 text-white/55 group-hover:text-white">
                                +
                              </p>
                            </button>
                            <span className="">
                              {product.product_detail.id === updatingItemId ? (
                                <Loading />
                              ) : (
                                <span className="text-white">
                                  {product.quantity}
                                </span>
                              )}
                            </span>
                            <button
                              className="rounded-lg border border-white/55 transition-all duration-100 group hover:border-white w-8 h-8 flex items-center justify-center cursor-pointer"
                              onClick={() => decrementQuantity(product)}
                              disabled={
                                product.product_detail.id === updatingItemId ||
                                product.quantity === 1
                              }
                            >
                              <p className="transition-all duration-100 text-white/55 group-hover:text-white">
                                -
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="w-full m-0 my-5 bg-white/10 border-0 h-px" />

                    <button
                      onClick={() => removeFromCart(product)}
                      className="absolute text-white/85 right-5 bottom-5 transition-all duration-100 lg:hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <hr className="w-full m-0 mt-6 mb-5" />

              <div className="flex items-center w-full justify-between text-white/65">
                <h5 className="text-lg font-semibold ms-2 text-[#fce803]">
                  <span className="font-light text-white/85">Total:</span> $
                  {formatPrice(totalPrice)}
                </h5>
              </div>

              <button
                className="mt-5 w-full lg:bg-black/80 bg-[#fce803] p-4 text-center border border-white/25 rounded-full transition-all duration-100 text-black lg:text-white font-semibold text-sm hover:bg-[#fce803] lg:hover:text-black"
                onClick={handlePay}
              >
                COMPRAR
              </button>
            </>
          )}
          <button
            className="absolute top-5 right-10 text-white"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
