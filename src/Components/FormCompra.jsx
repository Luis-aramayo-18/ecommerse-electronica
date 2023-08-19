import { useEffect, useState } from "react";
import { useCart } from "./Hooks/useCart";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./FormCompra.css";
import { toast } from "react-toastify";

const FormCompra = () => {
  const [step, setStep] = useState(0);
  const [numberPhoneError, setNumberPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [streetValueError, setSreetValueError] = useState("");
  const [numberStreetError, setNumberStreetError] = useState("");
  const { cart, clearCart, getTotalPrice } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

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
        return true;
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
    } else{
      toast.error('Complete los campos', {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
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

  const handleNumberPhoneChange = (e) => {
    const value = e.target.value;
    setShipmentInfo({ ...shipmentInfo, numberPhone: value });
    validateNumberPhone(value);
  };

  const validateNumberPhone = (value) => {
    if (value.trim() === "") {
      setNumberPhoneError("Complete el campo");
    } else if (value <= 0) {
      setNumberPhoneError("no puede ser menor o igual a 0");
    } else if (!/^[0-9]+$/.test(value)) {
      setNumberPhoneError("Solo debe contener numeros");
    } else if (value.length < 8) {
      setNumberPhoneError("Demasiado corto");
    } else if (value.length > 14) {
      setNumberPhoneError("demasiado largo");
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
    } else if (/^[A-Za-z\s]$/.test(value)) {
      setSreetValueError(
        "no puede contener solo numeros o caracteres especiales"
      );
    } else if (value.trim().length < 4) {
      setSreetValueError("nombre demasiado corto");
    } else if (value.trim().length > 25) {
      setSreetValueError("nombre demasiado largo");
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const payInf = {
      nombre: shipmentInfo.name,
      telefono: shipmentInfo.numberPhone,
      calle: shipmentInfo.street,
      altura: shipmentInfo.numberStreet,
      comentario: shipmentInfo.comments
    }
    const payInfLS=JSON.stringify(payInf)

    localStorage.setItem('infCompra', payInfLS)

    setStep(0);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);

    setTimeout(()=>{
      clearCart()
    },3300)

    // const data = {
    //   nombre: shipmentInfo.name,
    //   telefono: shipmentInfo.numberPhone,
    //   calle: shipmentInfo.street,
    //   altura: shipmentInfo.numberStreet,
    //   comentario: shipmentInfo.comments
    // };

    // try {
    //   const response = await fetch('URL_DE_TU_API_DE_WHATSAPP', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     // Guardar los datos en localStorage si la compra fue exitosa
    //     localStorage.setItem('purchaseData', JSON.stringify(data));
    //     toast.success('Compra exitosa, se envió el mensaje por WhatsApp.');
    //   } else {
    //     toast.error('Hubo un error al enviar el mensaje por WhatsApp.');
    //   }
    // } catch (error) {
    //   console.error('Error al enviar el mensaje por WhatsApp:', error);
    //   toast.error('Hubo un error al enviar el mensaje por WhatsApp.');
    // }
  };

  return (
    <>
      {/* ----------- FORM ---------------- */}
      <div className="contenedor-padre">
        <div className="row">
          <div className="div-form col-lg-7 col-md-8 col-sm-12">
            <form onSubmit={handleFormSubmit} className="form-container mt-4">
              <div className="form-steps">
                <div
                  className={`step ${step === 0 ? "active" : ""} ${
                    isStepComplete(0) ? "completed" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                    className="icon-form-compra"
                  >
                    <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                  </svg>
                </div>
                <div
                  className={`step ${step === 1 ? "active" : ""} ${
                    isStepComplete(1) ? "completed" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    className="icon-form-compra"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                </div>
                <div
                  className={`step ${step === 2 ? "completed" : "incomplete"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-form-compra"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                </div>
              </div>
              <div
                className="progress-bar"
                style={{ width: `${(step + 1) * 33.33}%` }}
              ></div>
              <div className="form-content">
                {step === 0 && (
                  <div className="d-flex flex-column">
                    <hr className="m-0 mb-3" />
                    <p className="text-start m-0 fs-5 mb-1">
                      Datos del destinatario *
                    </p>
                    <div className="div-destinatario d-flex">
                      <div className="div-destinatario-input">
                        <input
                          placeholder="Nombre"
                          type="text"
                          className={
                            nameError
                              ? "input-envio form-control is-invalid"
                              : "input-envio form-control is-valid"
                          }
                          id="name"
                          value={shipmentInfo.name}
                          onChange={handleNameChange}
                          required
                        />
                        {nameError && (
                          <div className="error-message invalid-feedback text-lowercase">
                            {nameError}
                          </div>
                        )}
                      </div>
                      <div className="input-container ms-3">
                        <input
                          minLength="10"
                          maxLength="14"
                          placeholder="Numero de telefono"
                          type="number"
                          className={
                            numberPhoneError
                              ? "input-envio form-control is-invalid"
                              : "input-envio form-control is-valid"
                          }
                          id="numberPhone"
                          onChange={handleNumberPhoneChange}
                          value={shipmentInfo.numberPhone}
                          required
                        />
                        {numberPhoneError && (
                          <div className="error-message invalid-feedback text-lowercase">
                            {numberPhoneError}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="datos-domicilio">Datos del domicilio *</p>
                    <div className="div-domicilio d-flex mt-1">
                      <div className="input-container">
                        <input
                          placeholder="Calle"
                          type="text"
                          className={
                            streetValueError
                              ? "input-envio form-control is-invalid"
                              : "input-envio form-control is-valid"
                          }
                          id="address"
                          onChange={handleStreetChange}
                          value={shipmentInfo.street}
                          required
                        />
                        {streetValueError && (
                          <div className="error-message invalid-feedback text-lowercase">
                            {streetValueError}
                          </div>
                        )}
                      </div>
                      <div className="input-containner, ms-3">
                        <input
                          placeholder="Altura"
                          type="number"
                          className={
                            numberStreetError
                              ? "input-envio form-control is-invalid"
                              : "input-envio form-control is-valid"
                          }
                          id="numberAddress"
                          onChange={handleNumberStreet}
                          value={shipmentInfo.numberStreet}
                          required
                        />
                        {numberStreetError && (
                          <div className="error-message invalid-feedback text-lowercase">
                            {numberStreetError}
                          </div>
                        )}
                      </div>
                    </div>
                    <textarea
                      type="text"
                      className={
                        shipmentInfo.comments
                          ? "input-envio form-control is-valid mt-4"
                          : "input-envio form control mt-4"
                      }
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
                        Acordar costo del envio una vez finalize la compra.
                      </label>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="step-content">
                    <h3 className="mt-3">Formas de pago</h3>
                    <hr className="m-0 mb-3" />
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
                        <div className="input-compra">
                          <label htmlFor="cash">Efectivo</label>
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
                        <div className="input-compra">
                          <label htmlFor="transfers">Transferencia</label>
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
                        <div className="input-compra">
                          <label htmlFor="creditcard">Tarjeta de credito</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="step-content">
                    <h3 className="mt-3">Confirmar</h3>
                    <hr className="m-0 mb-3" />
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
                <hr />
              </div>
              <div className="button-container">
                {step > 0 && (
                  <button
                    className="back-button btn btn-warning"
                    onClick={handleBack}
                  >
                    Atras
                  </button>
                )}
                {step < 2 && (
                  <button
                    className="next-button"
                    onClick={handleNext}
                    type={"button"}
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ------------- CART ---------------- */}
          <div className="col-lg-4 col-md-4 col-12 div-carrito">
            <h4 className="cart-title">Mi compra {cart.length}</h4>
            <hr className="m-0" />
            <ul className="p-0">
              {cart.map((product) => (
                <li key={product.id}>
                  <div className="div-carrito2 mt-2">
                    <img
                      className="img-cart"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="div-padre-precio">
                      <p className="name-cart">{product.name}</p>
                      <div className="div-contenedor-precio">
                        <p className="price-cart">${product.price}</p>
                        <p className="cantidad-cart">
                          Cantidad: {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="m-0" />
            <h3 className="cart-total">Total: ${getTotalPrice()}</h3>
            <hr />
            <button className="boton-incio" onClick={handleClick}>
              Volver al inicio
            </button>
          </div>
        </div>
        {
          showConfirmation && (
            <div className="modal-overlay-compra">
            <div className="modalConten-compra">
            <p className="text-center fs-5">Gracias por confiar en nosotros 🤩</p>
            </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default FormCompra;
