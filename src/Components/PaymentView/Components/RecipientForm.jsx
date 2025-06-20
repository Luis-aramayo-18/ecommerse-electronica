import React, { useEffect } from "react";

const RecipientForm = ({
  shipmentInfo,
  setShipmentInfo,
  setErrors,
  errors,
}) => {
  useEffect(() => {
    validateNumberPhone(shipmentInfo.numberPhone);
    validateName(shipmentInfo.name);
    validateDni(shipmentInfo.dni);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shipmentInfo.name,
    shipmentInfo.numberPhone,
    shipmentInfo.street,
    shipmentInfo.numberStreet,
    shipmentInfo.dni,
  ]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, name: value });
    validateName(value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;

    setShipmentInfo({ ...shipmentInfo, dni: value });
    validateDni(value);
  };

  const handleNumberPhoneChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberPhone: value });
    validateNumberPhone(value);
  };

  const validateName = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        name: "Complete el campo.",
      }));
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        name: "El nombre solo debe contener letras y espacios.",
      }));
    } else if (value.trim().length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Minimo 2 caracteres.",
      }));
    } else if (value.trim().length > 25) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Maximo 25 caracteres.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };

  const validateDni = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        dni: "Complete el campo.",
      }));
    } else if (value <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        dni: "No puede ser igual o menor a 0",
      }));
    } else if (!/^[0-9]+$/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        dni: "Solo debe contener numeros.",
      }));
    } else if (value.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        dni: "Minimo 8 caracteres.",
      }));
    } else if (value.length > 14) {
      setErrors((prevState) => ({
        ...prevState,
        dni: "Maximo 10 caracteres.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        dni: "",
      }));
    }
  };

  const validateNumberPhone = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        number: "Complete el campo.",
      }));
    } else if (value <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        number: "No puede ser igual a 0.",
      }));
    } else if (!/^[0-9]+$/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        number: "Solo debe contener numeros.",
      }));
    } else if (value.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        number: "Debe contener al menos 8 numeros.",
      }));
    } else if (value.length > 14) {
      setErrors((prevState) => ({
        ...prevState,
        number: "Maximo 14 numeros.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        number: "",
      }));
    }
  };  

  return (
    <div className="w-full mt-5">
      <h2 className="text-start text-2xl font-semibold text-white">
        Datos del destinatario
      </h2>

      <span className="font-medium text-xs text-[#fce803]/90 mt-3">
        El * indica que el campo es obligatorio
      </span>

      <div className="flex flex-wrap mt-5">
        <div className="flex flex-col-reverse lg:flex-row w-full gap-5">
          <div className="lg:w-[100%] relative">
            <div className="flex flex-col">
              <label
                htmlFor="Nombre"
                className="font-semibold text-gray-400 text-sm"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  placeholder="Nombre"
                  type="text"
                  className={`block bg-transparent text-white placeholder:text-sm w-full border-b border-white/25 focus:border-[#fce803] focus:outline-none${
                    errors.name ? " text-red-600 " : " text-green-600 "
                  }`}
                  id="name"
                  value={shipmentInfo.name || ""}
                  onChange={handleNameChange}
                  required
                />
                <p className="absolute right-3 top-0 text-2xl text-white/65">
                  *
                </p>
              </div>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="w-full">
            <div className="flex flex-col relative">
              <label htmlFor="" className="font-semibold text-gray-400 text-sm">
                DNI
              </label>
              <div className="mt-1">
                <input
                  placeholder="DNI"
                  type="number"
                  className="block bg-transparent text-white placeholder:text-sm w-full border-b border-white/25 focus:border-[#fce803] focus:outline-none"
                  value={shipmentInfo.dni || ""}
                  onChange={handleDniChange}
                  required
                />
                <p className="absolute right-3 top-0 text-2xl text-white/65">
                  *
                </p>
              </div>
            </div>
            {errors.dni && (
              <p className="text-sm text-red-500 mt-1">{errors.dni}</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[50%] mt-10 relative">
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-gray-400 text-sm">
              Numero de telefono
            </label>

            <div>
              <input
                minLength="10"
                maxLength="14"
                placeholder="Numero de teléfono"
                type="number"
                className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                  errors.number ? " text-red-600 " : " text-green-600 "
                }`}
                value={shipmentInfo.numberPhone || ""}
                onChange={handleNumberPhoneChange}
                required
              />
              <p className="absolute right-3 top-0 text-white/65 text-2xl">*</p>
            </div>
          </div>
          {errors.number && (
            <div className="text-sm text-red-500 mt-1">{errors.number}</div>
          )}

          <div className="flex flex-col mt-5">
            <label htmlFor="" className="font-semibold text-gray-400 text-sm">
              Email
            </label>
            <div>
              <input
                minLength="10"
                maxLength="14"
                placeholder="Email"
                type="email"
                className={`block bg-transparent text-white placeholder:text-sm w-full py-3 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                  errors.number ? " text-red-600 " : " text-green-600 "
                }`}
                value={shipmentInfo.email || ""}
                onChange={handleNumberPhoneChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default RecipientForm;
