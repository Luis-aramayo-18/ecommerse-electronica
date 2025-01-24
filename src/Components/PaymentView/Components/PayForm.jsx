import React from "react";

const PayForm = ({ setShipmentInfo, shipmentInfo }) => {
  return (
    <div className="w-full">
      <hr className="m-0 mb-4 border-t-2 border-gray-300" />
      <h3 className="text-start text-2xl font-semibold text-gray-800">
        Formas de pago
      </h3>

      <div className="payment-options mb-4">
        {/* Opción Efectivo */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
          onClick={() => setShipmentInfo({ ...shipmentInfo, pay: "efectivo" })}
        >
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={shipmentInfo.pay === "efectivo"}
            onChange={() => {}}
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="cash" className="text-lg text-gray-700">
            Efectivo
          </label>
        </div>

        {/* Opción Transferencia */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
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
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="transfers" className="text-lg text-gray-700">
            Transferencia
          </label>
        </div>

        {/* Opción Tarjeta Crédito/Débito */}
        <div
          className="flex items-center mt-4 gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
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
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="creditCard" className="text-lg text-gray-700">
            Tarjeta Crédito/Débito
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayForm;
