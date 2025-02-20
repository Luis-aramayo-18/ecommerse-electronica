import { useState } from "react";
import { useCart } from "../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../Hooks/useAxios";
import apiServices from "../../api/apiServices";

import "react-toastify/dist/ReactToastify.css";
import RecipientForm from "./Components/RecipientForm";
import StepsForm from "./Components/StepsForm";
import PayForm from "./Components/PayForm";
import ConfirmationForm from "./Components/ConfirmationForm";

const FormCompra = () => {
  const api = useAxios();
  const requestApi = apiServices(api);
  const [step, setStep] = useState(0);
  const [numberPhoneError, setNumberPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [streetValueError, setStreetValueError] = useState("");
  const [numberStreetError, setNumberStreetError] = useState("");
  const { cart, clearCart, getTotalPrice } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const [shipmentInfo, setShipmentInfo] = useState({
    name: "",
    dni: "",
    numberPhone: "",
    street: "",
    numberStreet: "",
    comments: "",
    pay: "",
  });

  const handleClick = () => {
    navigate("/");
  };

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
    } else {
      toast.error("Complete los campos", {
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

  const productToSend = cart.map((product) => ({
    product: product.id,
    quantity: product.quantity,
    price: product.final_price ? product.final_price : product.price,
    images: product.images,
  }));

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const payInf = {
      name: shipmentInfo.name,
      phone_number: shipmentInfo.numberPhone,
      dni: shipmentInfo.dni,
      street: shipmentInfo.street,
      number_of_street: shipmentInfo.numberStreet,
      comment: shipmentInfo.comments,
      payment_method: shipmentInfo.pay,
      order_items: productToSend,
    };

    try {
      const response = await requestApi.createOrder(payInf);
      console.log(response);

      if (response.status === 201) {
        console.log("orden tomada correctamente");
        setStep(0);
        setShowConfirmation(true);

        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);

        setTimeout(() => {
          clearCart();
        }, 3300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-6 sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-6 lg:py-8">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-start gap-10">
          {/* ----------- FORM ---------------- */}
          <div className="col-lg-7 col-md-8 col-sm-12 w-full lg:min-w-[630px]">
            <form onSubmit={handleFormSubmit} className="mt-4">
              <StepsForm step={step} isStepComplete={isStepComplete} />

              <div>
                {step === 0 && (
                  <RecipientForm
                    shipmentInfo={shipmentInfo}
                    nameError={nameError}
                    numberPhoneError={numberPhoneError}
                    streetValueError={streetValueError}
                    numberStreetError={numberStreetError}
                    setShipmentInfo={setShipmentInfo}
                    setNameError={setNameError}
                    setNumberPhoneError={setNumberPhoneError}
                    setStreetValueError={setStreetValueError}
                    setNumberStreetError={setNumberStreetError}
                  />
                )}

                {step === 1 && (
                  <PayForm
                    setShipmentInfo={setShipmentInfo}
                    shipmentInfo={shipmentInfo}
                  />
                )}

                {step === 2 && <ConfirmationForm shipmentInfo={shipmentInfo} />}
                <hr />
              </div>

              <div className="flex justify-between mt-4">
                {step > 0 && (
                  <button
                    className=" bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition duration-200"
                    onClick={handleBack}
                  >
                    Atrás
                  </button>
                )}
                {step < 2 && (
                  <button
                    className=" bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
                    onClick={handleNext}
                    type="button"
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ------------- CART ---------------- */}
          <div className="col-lg-4 col-md-4 col-12 mt-5">
            <ul className="p-0">
              {cart.map((product) => (
                <li key={product.id}>
                  <div className="flex gap-5 mt-2">
                    <div className="w-40">
                      <img
                        className="w-full object-cover"
                        src={product.images[0].image}
                        alt={product.name}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-medium">{product.name}</h2>

                      <div className="div-contenedor-precio">
                        <p className="text-base font-medium">
                          ${product.final_price || product.price}
                        </p>
                        <p className="text-sm font-light">
                          Cantidad: {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 me-3 text-end text-lg font-medium">
              Total: ${getTotalPrice()}
            </h3>
          </div>
        </div>

        {showConfirmation && (
          <div className="modal-overlay-compra">
            <div className="modalConten-compra">
              <p className="text-center fs-5">
                Gracias por confiar en nosotros 🤩
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormCompra;
