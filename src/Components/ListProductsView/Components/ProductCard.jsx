import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";

const ProductCard = ({ product, homeView, className = "", button }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  
  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  if (!product) {
    return <div>Producto no disponible</div>;
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`w-full flex flex-col lg:max-w-[200px] xl:max-w-[250px] group ${
        homeView ? "h-[390px]" : "h-300px"
      } sm:h-[360px] md:h-[360px] lg:h-[430px] relative`}
    >
      <Link
        to={`/products/category/${product.category}/product/${product.id}`}
        onClick={handleScrollToTop}
        className="h-[50%]"
      >
        <div className="transition duration-300 h-full lg:group-hover:shadow-md lg:group-hover:shadow-white">
          {product.images && product.images.length > 0 ? (
            <div className="h-full bg-white">
              <img
                src={`${product.images[0]?.image}`}
                className="w-full h-full object-contain cursor-pointer bg-white"
                alt={product.name}
              />
            </div>
          ) : (
            <span>No image</span>
          )}
        </div>
      </Link>

      <div className={`h-[50%] w-full flex flex-col justify-between pt-2 ${className}`}>
        <div>
          <h2 className="font-bold text-sm lg:text-base text-white/90">
            {product.name}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/65">
          <p className={`${product.is_on_sale ? "line-through" : ""}`}>
            <span className="font-medium">
              {product.is_on_sale ? "" : "Precio: "}
            </span>
            $
            {new Intl.NumberFormat("es-CO", {
              style: "decimal",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <span
            className={`${
              product.is_on_sale
                ? "font-medium text-[#101318] text-xs bg-[#fce803]/85 p-2"
                : "hidden"
            }`}
          >{`%${product.discount_percentage} OFF!`}</span>
        </div>

        <div className="text-white/65">
          <div>
            <p
              className={`${
                product.is_on_sale
                  ? "font-semibold mt-2"
                  : "overflow-hidden invisible h-0"
              }`}
            >
              Precio: $
              {new Intl.NumberFormat("es-CO", {
                style: "decimal",
                minimumFractionDigits: 0,
              }).format(product.final_price)}
            </p>
          </div>
        </div>

        <div className={`sm:block lg:block ${homeView ? "flex" : "hidden"}`}>
          <button
            className={`${button ? " " : ""} bg-black/30 border border-white/25 text-white rounded-full mt-2 w-full p-4 text-xs font-bold transition-all duration-200 lg:group-hover:bg-[#fce803] lg:group-hover:text-black  ${
              isProductInCart(product) ? "bg-[#FF3131]" : ""
            }`}
            onClick={() =>
              isProductInCart(product)
                ? removeFromCart(product)
                : addToCart(product)
            }
          >
            {isProductInCart(product) ? (
              <div className="flex items-center justify-center ">
                <p>ELIMINAR</p>
              </div>
            ) : (
              <div className="flex items-center justify-center ">
                <p>COMPRAR</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
