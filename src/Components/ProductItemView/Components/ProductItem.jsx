import React from "react";
import Slider from "react-slick";
import { useCart } from "../../Hooks/useCart";
import useFormatNumber from "../../Hooks/useFormatNumber";

const ProductItem = ({ product, comments }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const formattedPrice = useFormatNumber(product?.price || 0);
  const formattedFinalPrice = useFormatNumber(product?.final_price || 0);

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
          <i key={`full-${i}`} className="bx bxs-star text-yellow-400"></i>
        );
      }

      if (hasHalfStar) {
        average.push(
          <i key="half" className="bx bxs-star-half text-yellow-400"></i>
        );
      }

      for (let i = 0; i < emptyStars; i++) {
        average.push(<i key={`empty-${i}`} className="bx bx-star"></i>);
      }
    }

    return <div className="flex">{average}</div>;
  };

  return (
    <section>
      <div className="flex flex-col lg:flex lg:flex-row">
        <div className="w-full lg:w-[60%] lg:max-w-[660px]">
          {product ? (
            <Slider {...settingsSlider}>
              {product.images.map((img, idx) => (
                <div key={product.images.id || idx}>
                  <img
                    key={img.id}
                    src={img.image}
                    alt={product.name}
                    className="object-contain w-full"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>cargando</p>
          )}
        </div>

        <div className="mt-10 lg:ms-16 lg:mt-0 w-full lg:w-[40%] lg:max-w-[450px]">
          {product ? (
            <div>
              <div>
                <div className="flex flex-col md:flex gap-2">
                  <h2 className="text-xl font-bold uppercase">
                    {product.name}
                  </h2>
                  <div className="text-lg">{ratingProduct()}</div>
                </div>
                <p className="mt-3 text-light lowercase first-letter:uppercase">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-4">
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
                      ? "font-semibold text-white text-xl border p-2 shadow-md shadow-black"
                      : "invisible overflow-hidden h-0"
                  }`}
                >
                  %{product.discount_percentage} OFF !
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2">
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

              <div className="mt-5 flex items-center gap-4">
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
                  className="flex justify-center text-white bg-gray-900 p-4 border-2 shadow-md shadow-black"
                  style={{ backgroundColor: isProductInCart ? "red" : "" }}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? (
                    <div className="flex items-center justify-center gap-3">
                      <i className="bx bx-cart text-xl"></i>
                      <p className="font-extralight">ELIMINAR</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <i className="bx bx-cart-add text-xl"></i>
                      <p className="font-extralight">AGREGAR</p>
                    </div>
                  )}
                </button>

                <div className="flex justify-center items-center lg:flex-col lg:items-center gap-5 font-medium mt-5">
                  <hr className="w-full" />
                  <div>
                    <i className="bx bxs-truck me-2"></i>
                    <span>Calcular costo de Envió</span>
                  </div>
                  <div>
                    <i className="bx bx-store me-2"></i>
                    <span>Retirar en Tienda</span>
                  </div>
                  <hr className="w-full" />
                </div>
              </div>
            </div>
          ) : (
            <p>Cargando</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
