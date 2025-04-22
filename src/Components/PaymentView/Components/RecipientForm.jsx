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
    <div className="w-full mt-5">
      <h2 className="text-start text-2xl font-semibold text-white">
        Datos del destinatario
      </h2>

      <span className="font-medium text-xs text-white/65 mt-3">
        El * indica que el campo es obligatorio
      </span>

      <div className="flex flex-wrap mt-5">
        <div className="flex flex-col-reverse lg:flex-row w-full gap-5">
          <div className="lg:w-[100%] relative">
            <div className="flex items-center">
              <input
                placeholder="Nombre"
                type="text"
                className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none${
                  nameError ? " text-red-600 " : " text-green-600 "
                }`}
                id="name"
                value={shipmentInfo.name}
                onChange={handleNameChange}
                required
              />
              <p className="absolute right-3 text-2xl text-white/65">*</p>
            </div>
            {nameError && (
              <p className="text-sm text-red-500 mt-1">{nameError}</p>
            )}
          </div>

          <div className="w-full">
            <input
              placeholder="DNI"
              type="number"
              className="block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none"
              value={shipmentInfo.dni}
              onChange={handleDniChange}
              required
            />
          </div>
        </div>

        <div className="w-full lg:w-[50%] mt-5 relative">
          <div className="flex items-center">
            <input
              minLength="10"
              maxLength="14"
              placeholder="Numero de teléfono"
              type="number"
              className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                numberPhoneError ? " text-red-600 " : " text-green-600 "
              }`}
              onChange={handleNumberPhoneChange}
              value={shipmentInfo.numberPhone}
              required
            />
            <p className="absolute right-3 text-white/65 text-2xl">*</p>
          </div>
          {numberPhoneError && (
            <div className="text-sm text-red-500 mt-1">{numberPhoneError}</div>
          )}
        </div>
      </div>

      <h2 className="text-start text-2xl font-semibold mt-5 text-white">
        Datos del domicilio
      </h2>

      <div className="flex flex-col lg:flex-row gap-4 mt-5">
        <div className="relative w-full lg:w-[50%]">
          <div className="flex items-center">
            <input
              placeholder="Calle"
              type="text"
              className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                streetValueError ? " text-red-600 " : " text-green-600 "
              }`}
              onChange={handleStreetChange}
              value={shipmentInfo.street}
              required
            />
            <p className="absolute right-3 text-white/65 text-2xl">*</p>
          </div>
          {streetValueError && (
            <div className="text-sm text-red-500 mt-1">{streetValueError}</div>
          )}
        </div>

        <div className=" lg:ms-3 relative">
          <div className="flex items-center">
            <input
              placeholder="Altura"
              type="number"
              className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                numberStreetError ? " text-red-600 " : " text-green-600 "
              }`}
              onChange={handleNumberStreet}
              value={shipmentInfo.numberStreet}
              required
            />
            <p className="absolute right-3 text-white/65 text-2xl">*</p>
          </div>
          {numberStreetError && (
            <div className="text-sm text-red-500 mt-1">{numberStreetError}</div>
          )}
        </div>
      </div>

      <textarea
        type="text"
        className={`min-h-[120px] placeholder:text-sm resize-none bg-transparent block w-full py-2 border-b border-white/25 focus:outline-none focus:border-[#fce803] mt-5 ${
          shipmentInfo.comments ? " text-green-600 " : " text-gray-700 "
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
          className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-black/70 backdrop-blur-sm  focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
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
