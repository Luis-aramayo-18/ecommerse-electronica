import React, { useState } from "react";
import { useCart } from "../../Hooks/useCart";
import Loading from "../../Loading";
import { useAxios } from "../../Hooks/useAxios";

const InfoOrderDetails = ({ selectedOrder }) => {
  const api = useAxios();

  const { formatPrice, addToMultiplateItems, addToCart, loading } = useCart();

  const [loadingComponent, setLoadingComponent] = useState({
    mp_pay: false,
  });

  const formatNumberWithDots = (numberInput) => {
    if (numberInput === null || numberInput === undefined) {
      return "";
    }

    let num = parseFloat(numberInput);

    if (isNaN(num)) {
      return "N/A";
    }

    if (num % 1 === 0) {
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    } else {
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }
  };

  const handleRepuchase = (items) => {
    if (items.length > 1) {
      const cartItems = items.map((item) => {
        const productId = item.product_detail.id;
        const quantity = item.quantity;

        if (productId) {
          return {
            product_id: productId,
            quantity: quantity,
          };
        } else {
          return null;
        }
      });

      addToMultiplateItems(cartItems);
    } else {
      const item = items[0];
      const product = {
        id: item.product_detail.id,
        quantity: item.quantity,
      };
      console.log(product);

      addToCart(product);
    }
  };

  const handleMpPay = async (order) => {
    try {
      setLoadingComponent((prevState) => ({
        ...prevState,
        mp_pay: true,
      }));

      const response = await api.post(
        `/orders/${order.id}/re-create-preference/`
      );
      console.log(response);

      if (response.status === 200) {
        const initPoint = response.data.init_point;
        window.location.href = initPoint;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComponent((prevState) => ({
        ...prevState,
        mp_pay: false,
      }));
    }
  };

  return (
    <>
      <div className="relative flex flex-col gap-2">
        <div className="mb-2 text-sm font-medium text-[#fce803]">
          <h2>Detalles De La Compra.</h2>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Estado:</p>
          <p className="font-medium text-sm text-green-400">
            {selectedOrder.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">N° De Orden:</p>
          <p className="font-medium text-sm text-white/90">
            {selectedOrder.id}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Total:</p>
          <p className="font-medium text-sm text-white/90">
            ${formatPrice(selectedOrder.total_amount)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">DNI:</p>
          <p className="font-medium text-sm text-white/90">
            {formatNumberWithDots(selectedOrder.dni)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Metodo De Pago:</p>
          <div className="flex items-center gap-1">
            <p className="font-medium text-sm text-white/90 first-letter:uppercase">
              {selectedOrder.payment_method} - AR
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Fecha De Compra:</p>
          <p className="font-medium text-sm text-white/90">
            {selectedOrder.order_date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Fecha De Entrega:</p>
          <p className="font-medium text-sm text-white/90">10 De Diciembre </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-light text-white/85">Detalle de envio:</p>
          <div className="flex items-start sm:items-center gap-1">
            <p className="font-medium text-sm text-white/90">
              {selectedOrder.street} {" - "} {selectedOrder.number_of_street}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          {selectedOrder.status === "delivered" && (
            <div className="flex flex-col lg:flex-row gap-5 w-full">
              <button disabled className="btn-glass p-2 w-full lg:w-[30%]">
                Ver Factura
              </button>

              <button
                className="btn-glass p-2 w-full lg:w-[30%]"
                onClick={() => handleRepuchase(selectedOrder.order_items)}
              >
                {loading.addMultiplateItems || loading.addToCart ? (
                  <Loading />
                ) : (
                  <p>Volver A Comprar</p>
                )}
              </button>
            </div>
          )}

          {selectedOrder.payment_method === "mercado-pago" &&
            selectedOrder.status === "pending" && (
              <button
                onClick={() => handleMpPay(selectedOrder)}
                disabled={loadingComponent.mp_pay}
                className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[30%]"
              >
                {loadingComponent.mp_pay ? (
                  <Loading />
                ) : (
                  <p>Continuar con el pago</p>
                )}
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default InfoOrderDetails;
