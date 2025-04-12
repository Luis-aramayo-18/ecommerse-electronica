import React from "react";
import Slider from "react-slick";
import { useCart } from "../../Hooks/useCart";

const ProductItem = ({ product, comments, loading }) => {
  const { addToCart, removeFromCart, cart } = useCart();

  const checkProductInCart = (product) => {
    if (product) {
      return cart.some((item) => item.id === product.id);
    }
  };

  const isProductInCart = checkProductInCart(product);

  const settingsSlider = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const ratingProduct = () => {
    const average = [];
    const ratings = comments.map((comment) => comment.rating);

    if (ratings.length > 0) {
      const averageRating =
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

      const fullStars = Math.floor(averageRating);
      const hasHalfStar = averageRating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      for (let i = 0; i < fullStars; i++) {
        average.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-[#fea401]"
            key={`full-${i}`}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        );
      }

      if (hasHalfStar) {
        average.push(
          <i
            key="half"
            className="bx bxs-star-half text-[1rem] text-[#fea401]"
          ></i>
        );
      }

      for (let i = 0; i < emptyStars; i++) {
        average.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 text-[#b5babf]"
            key={`empty-${i}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        );
      }
    }

    return <div className="flex">{average}</div>;
  };

  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="w-full lg:w-[50%] rounded-2xl lg:max-w-[660px]">
          <Slider {...settingsSlider}>
            {product.images.map((img, idx) => (
              <div
                key={product.images.id || idx}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <img
                  key={img.id}
                  src={img.image}
                  alt={product.name}
                  className="object-contain w-full "
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-10 lg:ms-10 lg:mt-0 w-full border bg-black/70 backdrop-blur rounded-2xl px-4 py-10 shadow-[0_4px_10px_0_#6B7280]">
          <div>
            <div>
              <div className="flex flex-col md:flex gap-2">
                <h2 className="text-xl font-bold uppercase text-[#f0f7fe]">
                  {product.name}
                </h2>
                <div className="text-lg">{ratingProduct()}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-[#f0f7fe]">
              <p
                className={`${
                  product.is_on_sale
                    ? "line-through text-white text-sm"
                    : "text-light text-lg font-semibold"
                }`}
              >
                $
                {new Intl.NumberFormat("es-CO", {
                  style: "decimal",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </p>
              <p
                className={`${
                  product.is_on_sale
                    ? "font-semibold text-white text-xl border p-2 shadow-md shadow-black bg-[#FF3131]"
                    : "invisible overflow-hidden h-0"
                }`}
              >
                %{product.discount_percentage} OFF !
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[#f0f7fe]">
              <span>Precio:</span>
              <h2
                className={`${
                  product.is_on_sale
                    ? "text-lg font-bold"
                    : "invisible overflow-hidden h-0"
                }`}
              >
                $
                {new Intl.NumberFormat("es-CO", {
                  style: "decimal",
                  minimumFractionDigits: 0,
                }).format(product.final_price)}
              </h2>
            </div>

            <div className="mt-5 flex items-center gap-4 text-[#f0f7fe]">
              <h4 className="font-medium">Cantidad:</h4>

              <div className="flex items-center gap-3">
                <button
                  className="p-4 border w-6 h-6 flex items-center justify-center rounded-md"
                  onClick={() => removeFromCart(product)}
                >
                  -
                </button>

                <span className="text-base">
                  {cart.find((item) => item.id === product.id)?.quantity || 0}
                </span>

                <button
                  className="p-4 border w-6 h-6 flex items-center justify-center rounded-md"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <button
                className="mt-5 flex justify-center transition-all duration-100 text-white bg-black/70 p-4 border lg:hover:bg-[#fea401] lg:hover:shadow-md lg:hover:text-white lg:hover:border-white rounded-2xl"
                style={{
                  backgroundColor: isProductInCart ? "bg-[#FF3131]" : "",
                }}
                onClick={() => {
                  isProductInCart
                    ? removeFromCart(product)
                    : addToCart(product);
                }}
              >
                {isProductInCart ? (
                  <p className="font-bold">ELIMINAR</p>
                ) : (
                  <p className="font-bold">AGREGAR</p>
                )}
              </button>

              <div className="flex flex-col justify-center items-center  lg:items-center gap-5 font-medium mt-5 text-[#abafb4]">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>

                  <span>Calcular costo de Envió</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>

                  <span>Retirar en Tienda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mt-20 mt-10 shadow-[0_4px_10px_0_#6B7280] bg-black/70 backdrop-blur rounded-2xl overflow-hidden px-4 py-10">
        <h2 className="uppercase font-medium text-white">descripcion</h2>
        <p className="text-gray-400 mt-5">{product.description}</p>
      </div>
    </section>
  );
};

export default ProductItem;
