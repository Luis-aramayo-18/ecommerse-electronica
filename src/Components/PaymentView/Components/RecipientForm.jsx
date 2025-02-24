import React, { useEffect } from "react";

const RecipientForm = ({
  shipmentInfo,
  nameError,
  numberPhoneError,
  setShipmentInfo,
  setNameError,
  setNumberPhoneError,
  setStreetValueError,
  setNumberStreetError,
  streetValueError,
  numberStreetError,
}) => {
  useEffect(() => {
    validateNumberPhone(shipmentInfo.numberPhone);
    validateName(shipmentInfo.name);
    validateStreet(shipmentInfo.street);
    validateNumberStreet(shipmentInfo.numberStreet); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shipmentInfo.name,
    shipmentInfo.numberPhone,
    shipmentInfo.street,
    shipmentInfo.numberStreet,
  ]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, name: value });
    validateName(value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, dni: value });
  };

  const handleNumberPhoneChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberPhone: value });
    validateNumberPhone(value);
  };

  const handleNumberStreet = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberStreet: value });
    validateNumberStreet(value);
  };

  const handleStreetChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, street: value });
    validateStreet(value);
  };

  const validateName = (value) => {
    if (value.trim() === "") {
      setNameError("Complete el campo");
    } else if (/^[0-9]+$/.test(value)) {
      setNameError("Solo letras");
    } else if (value.trim().length < 2) {
      setNameError("demasiado corto");
    } else if (value.trim().length > 25) {
      setNameError("demasiado largo");
    } else {
      setNameError("");
    }
  };

  const validateNumberPhone = (value) => {
    if (value.trim() === "") {
      setNumberPhoneError("Complete el campo");
    } else if (value <= 0) {
      setNumberPhoneError("no puede ser menor o igual a 0");
    } else if (!/^[0-9]+$/.test(value)) {
      setNumberPhoneError("Solo debe contener números");
    } else if (value.length < 8) {
      setNumberPhoneError("Demasiado corto");
    } else if (value.length > 14) {
      setNumberPhoneError("demasiado largo");
    } else {
      setNumberPhoneError("");
    }
  };

  const validateStreet = (value) => {
    if (value.trim() === "") {
      setStreetValueError("Complete este campo");
    } else if (/^[A-Za-z\s]$/.test(value)) {
      setStreetValueError(
        "no puede contener solo números o caracteres especiales"
      );
    } else if (value.trim().length < 4) {
      setStreetValueError("nombre demasiado corto");
    } else if (value.trim().length > 25) {
      setStreetValueError("nombre demasiado largo");
    } else {
      setStreetValueError("");
    }
  };

  const validateNumberStreet = (value) => {
    if (value.trim() === "") {
      setNumberStreetError("Complete el campo");
    } else if (value <= 0) {
      setNumberStreetError("no puede ser menor o igual a 0");
    } else if (!/^[0-9]+$/.test(value)) {
      setNumberStreetError("Solo debe contener numeros");
    } else if (value.length > 4) {
      setNumberStreetError("demasiado largo");
    } else {
      setNumberStreetError("");
    }
  };

  return (
    <div className="w-full">
      <hr className="m-0 mb-3" />

      <h2 className="text-start text-2xl font-semibold">
        Datos del destinatario
      </h2>

      <span className="font-medium text-gray-800 mt-3">
        El * indica que el campo es obligatorio
      </span>

      <div className="flex flex-wrap mt-5">
        <div className="w-full lg:w-[45%] relative">
          <input
            placeholder="Nombre"
            type="text"
            className={`block w-full px-3 py-2 border rounded-md focus:outline-none ${
              nameError
                ? "border-red-500 text-red-600 focus:ring-red-500"
                : "border-green-500 text-green-600 focus:ring-green-500"
            }`}
            id="name"
            value={shipmentInfo.name}
            onChange={handleNameChange}
            required
          />
          <div className="absolute -right-3 -top-4 text-2xl">*</div>
          {nameError && (
            <p className="text-sm text-red-500 mt-1">{nameError}</p>
          )}
        </div>

        <div className="w-full lg:[45%] mt-3 relative">
          <input
            minLength="10"
            maxLength="14"
            placeholder="Numero de teléfono"
            type="number"
            className={`block w-full px-3 py-2 border rounded-md focus:outline-none ${
              numberPhoneError
                ? "border-red-500 text-red-600 focus:ring-red-500"
                : "border-green-500 text-green-600 focus:ring-green-500"
            }`}
            onChange={handleNumberPhoneChange}
            value={shipmentInfo.numberPhone}
            required
          />
          <div className="absolute -right-3 -top-4 text-2xl">*</div>
          {numberPhoneError && (
            <div className="text-sm text-red-500 mt-1">{numberPhoneError}</div>
          )}
        </div>

        <div className="w-full mt-3 lg:[45%] lg:ms-5">
          <input
            placeholder="DNI"
            type="number"
            className="block w-full px-3 py-2 border rounded-md focus:outline-none"
            value={shipmentInfo.dni}
            onChange={handleDniChange}
            required
          />
        </div>
      </div>

      <h2 className="text-start text-2xl font-semibold mt-5">
        Datos del domicilio
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 mt-5">
        <div className="relative w-full lg:w-[55%]">
          <input
            placeholder="Calle"
            type="text"
            className={`block w-full px-3 py-2 border rounded-md focus:outline-none ${
              streetValueError
                ? "border-red-500 text-red-600 focus:ring-red-500"
                : "border-green-500 text-green-600 focus:ring-green-500"
            }`}
            onChange={handleStreetChange}
            value={shipmentInfo.street}
            required
          />
          <div className="absolute -right-3 -top-4 text-2xl">*</div>
          {streetValueError && (
            <div className="text-sm text-red-500 mt-1">{streetValueError}</div>
          )}
        </div>

        <div className=" lg:ms-3 relative">
          <input
            placeholder="Altura"
            type="number"
            className={`block w-full px-3 py-2 border rounded-md focus:outline-none ${
              numberStreetError
                ? "border-red-500 text-red-600 focus:ring-red-500"
                : "border-green-500 text-green-600 focus:ring-green-500"
            }`}
            onChange={handleNumberStreet}
            value={shipmentInfo.numberStreet}
            required
          />
          <div className="absolute -right-3 -top-4 text-2xl">*</div>
          {numberStreetError && (
            <div className="text-sm text-red-500 mt-1">{numberStreetError}</div>
          )}
        </div>
      </div>

      <textarea
        type="text"
        className={`min-h-[120px] block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 mt-4 ${
          shipmentInfo.comments
            ? "border-green-500 text-green-600 focus:ring-green-500"
            : "border-gray-300 text-gray-700 focus:ring-gray-500"
        }`}
        placeholder="Deja un comentario"
        id="textReference"
        value={shipmentInfo.comments}
        onChange={(e) =>
          setShipmentInfo({
            ...shipmentInfo,
            comments: e.target.value,
          })
        }
      />

      <div className="mt-5 text-start">
        <input
          className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked
          readOnly
        />
        <label
          className="text-sm text-gray-700 ml-2"
          htmlFor="flexCheckChecked"
        >
          Acordar costo del envió una vez finalice la compra.
        </label>
      </div>
    </div>
  );
};

export default RecipientForm;
