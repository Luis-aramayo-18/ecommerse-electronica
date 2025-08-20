import React, { useEffect, useState } from "react";
import Select from "react-select";
import Loading from "../../Loading";

const DirectionForm = ({
  shipmentInfo,
  setShipmentInfo,
  setErrors,
  errors,
  directions,
  loading,
}) => {
  const [selectedDirection, setselectedDirection] = useState(null);

  useEffect(() => {
    const defectDirection = directions.find(
      (dir) => dir.address_type === "home"
    );

    if (defectDirection) {
      updateDirection(defectDirection.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    validateStreet(shipmentInfo.street);
    validateNumberStreet(shipmentInfo.numberStreet);
    validateCp(shipmentInfo.cp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentInfo.street, shipmentInfo.numberStreet, shipmentInfo.cp]);

  const handleCPChange = (e) => {
    const value = e.target.value;

    setShipmentInfo((prev) => ({
      ...prev,
      cp: value,
    }));

    validateCp(value);
  };

  const validateCp = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        cp: "Complete este campo.",
      }));
    } else if (value.length > 10) {
      setErrors((prevState) => ({
        ...prevState,
        cp: "Máximo 10 caracteres.",
      }));
    } else if (value.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        cp: "Mínimo 2 caracteres.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        cp: "",
      }));
    }
  };

  const handleStreetChange = (e) => {
    const value = e.target.value;

    setShipmentInfo((prev) => ({
      ...prev,
      street: value,
    }));

    validateStreet(value);
  };

  const validateStreet = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        street: "Complete este campo.",
      }));
    } else if (/^[A-Za-z\s]$/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        street: "No puede contener numeros o caracteres especiales.",
      }));
    } else if (value.trim().length < 4) {
      setErrors((prevState) => ({
        ...prevState,
        street: "Minimo 4 caracteres.",
      }));
    } else if (value.trim().length > 25) {
      setErrors((prevState) => ({
        ...prevState,
        street: "Maximo 25 caracteres.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        street: "",
      }));
    }
  };

  const handleNumberStreet = (e) => {
    const value = e.target.value;

    setShipmentInfo((prev) => ({
      ...prev,
      numberStreet: value,
    }));

    validateNumberStreet(value);
  };

  const validateNumberStreet = (value) => {
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        numberStreet: "Complete este campo.",
      }));
    } else if (value <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        numberStreet: "No puede ser menor o igual al 0.",
      }));
    } else if (!/^[0-9]+$/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        numberStreet: "Solo debe contener numeros.",
      }));
    } else if (value.length > 6) {
      setErrors((prevState) => ({
        ...prevState,
        numberStreet: "maximo 6 caracteres",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        numberStreet: "",
      }));
    }
  };

  const updateDirection = (directionId) => {
    const selectedDirectionObject = directions.find(
      (dir) => dir.id === directionId
    );

    if (selectedDirectionObject) {
      setShipmentInfo((prevState) => ({
        ...prevState,
        street: selectedDirectionObject.street,
        numberStreet: selectedDirectionObject.number,
        comments: selectedDirectionObject.reference,
        cp: selectedDirectionObject.cp,
      }));

      setselectedDirection({
        value: selectedDirectionObject.id,
        label: selectedDirectionObject.address_type,
      });
    } else {
      console.warn("Dirección seleccionada no encontrada:", directionId);
    }
  };

  const handleDirectionChange = (selectedOption) => {
    updateDirection(selectedOption.value);
  };

  const options = directions.map((dir) => ({
    value: dir.id,
    label: dir.address_type,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      boxShadow: "none",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderColor: state.isFocused ? "#fce803" : "#ffffff40",
      color: "white",
      padding: "10px 0",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(20px)",
      borderColor: "rgba(255, 255, 255, 0.25)",
      borderWidth: "1px",
      color: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "15rem",
      overflowY: "auto",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      fontWeight: "600",
      fontSize: "0.9rem",
      margin: "0, 1rem",
      color: state.isSelected ? "[#fce803]" : "",
      cursor: "pointer",
      "&:hover": {
        color: "#fce803",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.65)",
    }),
  };

  return (
    <div>
      <h2 className="text-start text-2xl font-semibold mt-5 text-white">
        Datos del domicilio
      </h2>

      {loading.get_direction ? (
        <Loading />
      ) : (
        <div>
          <div>
            <Select
              required
              placeholder="Direcciones"
              onChange={handleDirectionChange}
              options={options}
              styles={customStyles}
              value={selectedDirection}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-10">
            <div className="relative w-full lg:w-[50%]">
              <label htmlFor="" className="font-semibold text-gray-400 text-sm">
                Calle
              </label>

              <div className="flex mt-1">
                <input
                  placeholder="Ingresar nombre de la calle."
                  type="text"
                  className={`block bg-transparent placeholder:text-xs text-white w-full pb-2 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                    errors.street ? " text-red-600 " : ""
                  }`}
                  value={shipmentInfo.street}
                  onChange={handleStreetChange}
                  required
                />
                <p className="absolute right-3 text-white/65 text-2xl">*</p>
              </div>
              {errors.street && (
                <p className="text-sm text-red-500 mt-1">{errors.street}</p>
              )}
            </div>

            <div className="lg:ms-3 relative">
              <label htmlFor="" className="font-semibold text-gray-400 text-sm">
                Numero
              </label>

              <div className="flex mt-1">
                <input
                  placeholder="Ingrese el numero de la calle."
                  type="number"
                  className={`block bg-transparent text-white placeholder:text-xs w-full pb-2 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                    errors.numberStreet ? " text-red-600 " : ""
                  }`}
                  value={shipmentInfo.numberStreet}
                  onChange={handleNumberStreet}
                  required
                />
                <p className="absolute right-3 text-white/65 text-2xl">*</p>
              </div>
              {errors.numberStreet && (
                <div className="text-sm text-red-500 mt-1">
                  {errors.numberStreet}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="relative w-full lg:w-[28%]">
              <label htmlFor="" className="font-semibold text-gray-400 text-sm">
                Codigo Postal
              </label>

              <div className="flex mt-1">
                <input
                  placeholder="Ingrese C/P de su ciudad."
                  type="text"
                  className={`block bg-transparent placeholder:text-xs text-white w-full pb-2 border-b border-white/25 focus:border-[#fce803] focus:outline-none ${
                    errors.street ? " text-red-600 " : ""
                  }`}
                  value={shipmentInfo.cp}
                  onChange={handleCPChange}
                  required
                />
                <p className="absolute right-3 text-white/65 text-2xl">*</p>
              </div>
              {errors.cp && (
                <div className="text-sm text-red-500 mt-1">{errors.cp}</div>
              )}
            </div>

            <div className="mt-8">
              <textarea
                type="text"
                className={`min-h-[120px] placeholder:text-xs resize-none bg-transparent block w-full pb-2 mt-1 border-b border-white/25 focus:outline-none focus:border-[#fce803] ${
                  shipmentInfo.comments ? " text-green-600 " : " text-gray-700 "
                }`}
                placeholder="Ingrese, piso, dpto, barrio, lote, manzana etc.."
                id="textReference"
                value={shipmentInfo.comments || ""}
                onChange={(e) =>
                  setShipmentInfo((prev) => ({
                    ...prev,
                    comments: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectionForm;
