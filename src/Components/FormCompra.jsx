import "./FormCompra.css";
import { useEffect, useState } from "react";
import { useCart } from "./Hooks/useCart";
import { useNavigate } from "react-router-dom";

const FormCompra = () => {
  const [step, setStep] = useState(0);
  const [numberPhoneError, setNumberPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [streetValueError, setSreetValueError] = useState("");
  const [numberStreetError, setNumberStreetError] = useState("");
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCart();

  const [shipmentInfo, setShipmentInfo] = useState({
    name: "",
    numberPhone: "",
    street: "",
    numberStreet: "",
    comments: "",
    pay: "",
  });

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    validateNumberPhone(shipmentInfo.numberPhone);
    validateName(shipmentInfo.name);
    validateStreet(shipmentInfo.street);
    validateNumberStreet(shipmentInfo.numberStreet);
  }, [
    shipmentInfo.name,
    shipmentInfo.numberPhone,
    shipmentInfo.street,
    shipmentInfo.numberStreet,
  ]);

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return (
          nameError === "" &&
          numberPhoneError === "" &&
          streetValueError === "" &&
          numberStreetError === ""
        );
      case 1:
        return shipmentInfo.pay !== "";
      case 2:
        return true; // The last step is always complete
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (
      (step === 0 &&
        nameError === "" &&
        numberPhoneError === "" &&
        streetValueError === "" &&
        numberStreetError === "") ||
      (step === 1 && shipmentInfo.pay !== "")
    ) {
      setStep(step + 1);
    } else if (isStepComplete(step)) {
      setStep(step + 1);
    } else {
      alert("Please complete the current step.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, name: value });
    validateName(value);
  };

  const validateName = (value) => {
    if (value.trim() === "") {
      setNameError("Complete el campo");
    } else if (!/^[A-Za-z\s]{2,20}$/.test(value)) {
      setNameError("Solo letras, minimo 2 caracteres, maximo 20");
    } else {
      setNameError("");
    }
  };

  const handleNumberPhoneChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberPhone: value });
    validateNumberPhone(value);
  };

  const validateNumberPhone = (value) => {
    if (value.trim() === "") {
      setNumberPhoneError("Complete el campo");
    } else if (!/^[0-9]+$/.test(value)) {
      setNumberPhoneError("Solo debe contener numeros");
    } else {
      setNumberPhoneError("");
    }
  };

  const handleStreetChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, street: value });
    validateStreet(value);
  };

  const validateStreet = (value) => {
    if (value.trim() === "") {
      setSreetValueError("Complete este campo");
    } else if (/^[0-9]+$/.test(value)) {
      setSreetValueError("No debe contener numeros");
    } else {
      setSreetValueError("");
    }
  };

  const handleNumberStreet = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberStreet: value });
    validateNumberStreet(value);
  };

  const validateNumberStreet = (value) => {
    if (value.trim() === "") {
      setNumberStreetError("Complete este campo");
    } else if (!/^[0-9]+$/.test(value)) {
      setNumberStreetError("Solo debe contener numeros");
    } else {
      setNumberStreetError("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* ----------- FORM ---------------- */}
      <div className="container">
        <div className="row ">
          <div className="col-8">
            <h1 className="text-center mt-2">Datos del envio</h1>
            <hr />
            <form onSubmit={handleFormSubmit} className="form-container">
              <div className="form-steps">
                <div className={`step ${step === 0 ? "active" : ""}`}>
                  Envio
                </div>
                <div className={`step ${step === 1 ? "active" : ""}`}>Pago</div>
                <div className={`step ${step === 2 ? "active" : ""}`}>
                  Confirmar
                </div>
              </div>
              <div
                className="progress-bar"
                style={{ width: `${(step + 1) * 33.33}%` }}
              ></div>
              <div className="form-content">
                {step === 0 && (
                  <div className="d-flex flex-column">
                    <h3>Complete los campos</h3>
                    <hr />
                    <p className="text-start m-0">Datos del destinatario</p>
                    <div className="d-flex mt-1">
                      <input
                        placeholder="Nombre"
                        type="text"
                        className="form-control"
                        id="name"
                        value={shipmentInfo.name}
                        onChange={handleNameChange}
                      />
                      {nameError && (
                        <div className="error-message">{nameError}</div>
                      )}
                      <input
                        minlength="10"
                        maxLength="14"
                        placeholder="Numero de telefono"
                        type="number"
                        className="form-control ms-3"
                        id="numberPhone"
                        onChange={handleNumberPhoneChange}
                        value={shipmentInfo.numberPhone}
                      />
                      {numberPhoneError && (
                        <div className="error-message">{numberPhoneError}</div>
                      )}
                    </div>
                    <p className="text-start m-0 mt-3">Datos de la entrega</p>
                    <div className="d-flex mt-1">
                      <input
                        placeholder="Calle"
                        type="text"
                        className="form-control"
                        id="address"
                        onChange={handleStreetChange}
                        value={shipmentInfo.street}
                      />
                      {streetValueError && (
                        <div className="error-message">{streetValueError}</div>
                      )}
                      <input
                        placeholder="Altura"
                        type="number"
                        className="form-control ms-3"
                        id="numberAddress"
                        onChange={handleNumberStreet}
                        value={shipmentInfo.numberStreet}
                      />
                      {numberStreetError && (
                        <div className="error-message">{numberStreetError}</div>
                      )}
                    </div>
                    <textarea
                      type="text"
                      className="form-control mt-4"
                      placeholder="Deja un comentario"
                      id="textReference"
                      value={shipmentInfo.comments}
                      onChange={(e) =>
                        setShipmentInfo({
                          ...shipmentInfo,
                          comments: e.target.value,
                        })
                      }
                    ></textarea>
                    <div className="form-check mt-4 text-start">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckChecked"
                      >
                        Acordar costo del envio una vez finalize la compra
                      </label>
                    </div>
                    <hr className="mt-3" />
                  </div>
                )}

                {step === 1 && (
                  <div className="step-content">
                    <h3>Formas de pago</h3>
                    <hr />
                    <div className="payment-options">
                      <div
                        className="payment-option d-flex"
                        onClick={() =>
                          setShipmentInfo({ ...shipmentInfo, pay: "efectivo" })
                        }
                      >
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                          checked={shipmentInfo.pay === "efectivo"}
                          onChange={() => {}}
                        />
                        <div className="border border-info w-100 p-3 ms-2 rounded">
                          <label htmlFor="cash">Cash</label>
                        </div>
                      </div>
                      <div
                        className="payment-option d-flex mt-3"
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
                        />
                        <div className="border rounded border-info p-3 ms-1 w-100 ms-2">
                          <label htmlFor="transfers">Transfers</label>
                        </div>
                      </div>
                      <div
                        className="payment-option d-flex mt-3"
                        onClick={() =>
                          setShipmentInfo({
                            ...shipmentInfo,
                            pay: "tarjeta de credito",
                          })
                        }
                      >
                        <input
                          type="radio"
                          id="creditcard"
                          name="paymentMethod"
                          value="creditcard"
                          checked={shipmentInfo.pay === "tarjeta de credito"}
                          onChange={() => {}}
                        />
                        <div className="border border-info rounded w-100 p-3 ms-2">
                          <label htmlFor="creditcard">Credit Card</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="step-content">
                    <h3>Confirmar</h3>
                    <hr />
                    <h5>Nombre: {shipmentInfo.name}</h5>
                    <h5>Celular: {shipmentInfo.numberPhone}</h5>
                    <h5>Calle: {shipmentInfo.street}</h5>
                    <h5>Altura: {shipmentInfo.numberStreet}</h5>
                    {shipmentInfo.comments ? (
                      <h5>Comentario: {shipmentInfo.comments}</h5>
                    ) : null}
                    <h5>Pago: {shipmentInfo.pay}</h5>
                    <button type="submit" className="buy-button">
                      Comprar
                    </button>
                  </div>
                )}
              </div>
              <div className="button-container">
                {step > 0 && (
                  <button className="back-button" onClick={handleBack}>
                    Back
                  </button>
                )}
                {step < 2 && (
                  <button className="next-button" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
          
          
      {/* ------------- CART ---------------- */}
          <div className="col-4">
            <h3 className="text-center mt-4">Mi compra {cart.length}</h3>
            <hr />
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  <div className="d-flex mt-2">
                    <img
                      className="w-50 h-50"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="ms-2">
                      <p className="m-0">{product.name}</p>
                      <p>${product.price}</p>
                      <p>Cantidad: {product.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <h3>Total: ${getTotalPrice()}</h3>
            <hr />
            <button
              className="w-100 p-2 bg-warning rounded mt-3"
              onClick={handleClick}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCompra;
