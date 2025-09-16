import React from "react";
import { useCart } from "../../Hooks/useCart";

const ProductPay = ({
  selectedOrder,
  setFormActive,
  setItemSelectedForReview,
}) => {
  const { formatPrice } = useCart();

  const handleProductFormActive = (item) => {
    setFormActive((prev) => ({
      ...prev,
      formProduct: true,
    }));

    setItemSelectedForReview(item);
  };

  return (
    <>
      {selectedOrder.order_items.map((item, idx) => (
        <div className="relative" key={item.id || idx}>
          <div
            className="flex flex-col sm:flex-row gap-5 h-full"
          >
            {item.product_detail.images[0] && (
              <img
                src={item.product_detail.images[0].image}
                alt={item.product_detail.name}
                className="w-[60%] h-auto sm:w-44 sm:h-52 object-cover rounded-2xl"
              />
            )}

            <div className="flex flex-col justify-between gap-2 w-full">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-white">
                  {item.product_detail.name}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-xs font-light text-white/85">Precio:</p>
                <p className="font-medium text-sm text-white/90">
                  ${formatPrice(item.product_detail.price)}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-xs font-light text-white/85">Descuento:</p>
                <p className="font-medium text-sm text-white/90">
                  {item.product_detail.discount_percentage}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-xs font-light text-white/85">
                  Precio Final:
                </p>
                <p className="font-medium text-sm text-white/90">
                  ${formatPrice(item.price)}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="font-light text-xs text-white/85">Cantidad:</p>
                <p className="font-medium text-sm text-white/90">
                  {item.quantity}
                </p>
              </div>

              <button
                className="btn-glass p-2 w-full lg:w-[40%] mt-5 sm:mt-0"
                onClick={() => handleProductFormActive(item.product_detail.id)}
              >
                Opinar de este producto
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductPay;
