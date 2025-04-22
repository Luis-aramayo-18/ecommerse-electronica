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
          className="flex items-center mt-4 gap-3 cursor-pointer text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black p-2 rounded-lg transition-all"
          onClick={() => setShipmentInfo({ ...shipmentInfo, pay: "efectivo" })}
        >
          <input
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

        {/* Opción Transferencia */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black p-2 rounded-lg transition-all"
          onClick={() =>
            setShipmentInfo({
              ...shipmentInfo,
              pay: "transferencia",
            })
          }
        >
          <input
            type="radio"
            id="transfers"
            name="paymentMethod"
            value="transfers"
            checked={shipmentInfo.pay === "transferencia"}
            onChange={() => {}}
            className="h-5 w-5"
          />
          <label htmlFor="transfers" className="font-medium">
            Transferencia
          </label>
        </div>

        {/* Opción Tarjeta Crédito/Débito */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer text-white/65 lg:hover:bg-[#fce803] lg:hover:text-black p-2 rounded-lg transition-all"
          onClick={() =>
            setShipmentInfo({
              ...shipmentInfo,
              pay: "tarjeta",
            })
          }
        >
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            checked={shipmentInfo.pay === "tarjeta"}
            onChange={() => {}}
            className="h-5 w-5 "
          />
          <label htmlFor="creditCard" className="font-medium">
            Tarjeta Crédito/Débito
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayForm;
