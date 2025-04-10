import React from "react";

const ConfirmationForm = ({ shipmentInfo }) => {
  return (
    <div className="step-content rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-[#9cccf4] mt-3">Confirmar</h3>

      <div className="space-y-3 mt-5">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-[#f0f7fe]">Nombre:</h3>
          <p className="font-light text-[#deecfb] first-letter:uppercase">
            {shipmentInfo.name}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-[#f0f7fe]">Telefono:</h3>
          <p className="font-light text-[#deecfb] first-letter:uppercase">
            {shipmentInfo.numberPhone}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-[#f0f7fe]">Calle:</h3>
          <p className="font-light text-[#deecfb] first-letter:uppercase">
            {shipmentInfo.street}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-[#f0f7fe]">Altura:</h3>
          <p className="font-light text-[#deecfb] first-letter:uppercase">
            {shipmentInfo.numberStreet}
          </p>
        </div>

        {shipmentInfo.comments && (
          <h5 className="text-lg text-gray-700">
            Comentario:{" "}
            <span className="font-semibold">{shipmentInfo.comments}</span>
          </h5>
        )}

        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-[#f0f7fe]">Pago:</h3>
          <p className="font-light text-[#deecfb] first-letter:uppercase">
            {shipmentInfo.pay} C/D
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-3 w-full bg-black/70 backdrop-blur border rounded-xl text-white text-lg font-semibold hover:bg-[#fea401] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-100"
      >
        Comprar
      </button>
    </div>
  );
};

export default ConfirmationForm;
