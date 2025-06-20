import Loading from "../../Loading";

const ConfirmationForm = ({ shipmentInfo, loading }) => {
  return (
    <div className="step-content rounded-lg shadow-lg">
      <div className="space-y-3 mt-5">
        <div className="flex gap-2 items-center">
          <h3 className="font-light text-white">Nombre:</h3>
          <p className="text-sm font-bold text-[#fce803] first-letter:uppercase">
            {shipmentInfo.name}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="font-light text-white">Telefono:</h3>
          <p className="text-sm font-bold text-[#fce803] first-letter:uppercase">
            {shipmentInfo.numberPhone}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="font-light text-white">Calle:</h3>
          <p className="text-sm font-bold text-[#fce803] first-letter:uppercase">
            {shipmentInfo.street}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="font-light text-white">Altura:</h3>
          <p className="text-sm font-bold text-[#fce803] first-letter:uppercase">
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
          <h3 className="font-light text-white">Pago:</h3>
          <p className="text-sm font-bold text-[#fce803] first-letter:uppercase">
            {shipmentInfo.pay}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationForm;
