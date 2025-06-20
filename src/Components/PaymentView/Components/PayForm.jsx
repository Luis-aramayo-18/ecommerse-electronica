import React from "react";

const PayForm = ({ setShipmentInfo, shipmentInfo }) => {
  return (
    <div className="w-full">
      <h3 className="text-start mt-3 text-2xl font-semibold text-white">
        Formas de pago
      </h3>

      <div className="payment-options mb-4">
        {/* Opción Efectivo */}
        <div
          className="flex items-center mt-5 gap-3 cursor-pointer text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black p-2 rounded-lg transition-all h-20 overflow-hidden"
          onClick={() => setShipmentInfo({ ...shipmentInfo, pay: "efectivo" })}
        >
          <input
            required
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={shipmentInfo.pay === "efectivo"}
            onChange={() => {}}
            className="h-5 w-5"
          />
          <label htmlFor="cash" className="font-medium">
            Efectivo
          </label>
        </div>

        <div
          className="flex items-center mt-4 gap-3 cursor-pointer text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black p-2 rounded-lg transition-all h-20 overflow-hidden"
          onClick={() =>
            setShipmentInfo({
              ...shipmentInfo,
              pay: "mercado-pago",
            })
          }
        >
          <input
            type="radio"
            id="transfers"
            name="paymentMethod"
            value="transfers"
            checked={shipmentInfo.pay === "mercado-pago"}
            onChange={() => {}}
            className="h-5 w-5"
          />
          <img src="/img/payment/mercadopago.png" className="w-[20%]" alt="" />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-[#fce803]/90"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-medium text-xs text-[#fce803]/90">
            Una vez finalize la compra, se acordara costo de envio con el
            vendedor.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PayForm;
