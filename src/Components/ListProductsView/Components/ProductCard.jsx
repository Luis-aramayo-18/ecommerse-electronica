import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  if (!product) {
    return <div>Producto no disponible</div>;
  }

  return (
    <div className="max-w-[250px] flex flex-col  group h-[290px] md:h-[320px] lg:h-[380px]">
      <Link
        to={`/products/category/${product.category}/product/${product.id}`}
        className="h-[50%]"
      >
        <div className="transition duration-300 group-hover:shadow-md group-hover:shadow-white/70 h-full">
          {product.images && product.images.length > 0 ? (
            <div className="h-full bg-white">
              <img
                src={`${product.images[0]?.image}`}
                className="w-full h-full object-contain cursor-pointer"
                alt={product.name}
              />
            </div>
          ) : (
            <span>No image</span>
          )}
        </div>
      </Link>

      <div className="h-[50%] w-full flex flex-col justify-between pt-2">
        <div>
          <div>
            <h2 className="font-bold text-sm lg:text-base">{product.name}</h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
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
                  ? "font-medium text-xs bg-red-500 p-2"
                  : "hidden"
              }`}
            >{`%${product.discount_percentage} OFF!`}</span>
          </div>

          <div>
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
        </div>

        <div className="hidden lg:block">
          <button
            className={`mt-2 w-full p-4 text-xs font-bold transition duration-300 text-neutral-400 border-gray-300 border-2 group-hover:text-white group-hover:border-white ${
              isProductInCart(product) ? "bg-red-500" : "bg-black/80"
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
