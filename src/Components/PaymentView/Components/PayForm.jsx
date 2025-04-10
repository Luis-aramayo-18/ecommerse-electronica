import React from "react";

const PayForm = ({ setShipmentInfo, shipmentInfo }) => {
  return (
    <div className="w-full">
      <h3 className="text-start mt-3 text-2xl font-semibold text-[#9cccf4]">
        Formas de pago
      </h3>

      <div className="payment-options mb-4">
        {/* Opción Efectivo */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-[#fea401] p-2 rounded-lg transition-all"
          onClick={() => setShipmentInfo({ ...shipmentInfo, pay: "efectivo" })}
        >
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={shipmentInfo.pay === "efectivo"}
            onChange={() => {}}
            className="h-5 w-5 text-white border-gray-300 focus:ring-[#fea401]"
          />
          <label htmlFor="cash" className=" text-gray-300 font-medium">
            Efectivo
          </label>
        </div>

        {/* Opción Transferencia */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-[#fea401] p-2 rounded-lg transition-all"
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
            className="h-5 w-5 text-white border-gray-300 focus:ring-[#fea401]"
          />
          <label htmlFor="transfers" className="text-gray-300 font-medium">
            Transferencia
          </label>
        </div>

        {/* Opción Tarjeta Crédito/Débito */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-[#fea401] p-2 rounded-lg transition-all"
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
            className="h-5 w-5 text-white border-gray-300 focus:ring-[#fea401]"
          />
          <label htmlFor="creditCard" className="text-gray-300 font-medium">
            Tarjeta Crédito/Débito
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayForm;
