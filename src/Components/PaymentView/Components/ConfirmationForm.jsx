import React from "react";

const ConfirmationForm = ({ shipmentInfo }) => {
  return (
    <div className="step-content p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mt-3">Confirmar</h3>
      <hr className="my-4 border-t-2 border-gray-300" />

      <div className="space-y-3">
        <h5 className="text-lg text-gray-700">
          Nombre: <span className="font-semibold">{shipmentInfo.name}</span>
        </h5>
        <h5 className="text-lg text-gray-700">
          Celular:{" "}
          <span className="font-semibold">{shipmentInfo.numberPhone}</span>
        </h5>
        <h5 className="text-lg text-gray-700">
          Calle: <span className="font-semibold">{shipmentInfo.street}</span>
        </h5>
        <h5 className="text-lg text-gray-700">
          Altura:{" "}
          <span className="font-semibold">{shipmentInfo.numberStreet}</span>
        </h5>

        {shipmentInfo.comments && (
          <h5 className="text-lg text-gray-700">
            Comentario:{" "}
            <span className="font-semibold">{shipmentInfo.comments}</span>
          </h5>
        )}

        <h5 className="text-lg text-gray-700">
          Pago: <span className="font-semibold">{shipmentInfo.pay}</span>
        </h5>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-3 w-full bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        Comprar
      </button>
    </div>
  );
};

export default ConfirmationForm;
