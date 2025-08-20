import { useEffect, useState } from "react";
import { useCart } from "../Hooks/useCart";
import { toast } from "react-toastify";
import { useAxios } from "../Hooks/useAxios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import RecipientForm from "./Components/RecipientForm";
import StepsForm from "./Components/StepsForm";
import PayForm from "./Components/PayForm";
import DirectionForm from "./Components/DirectionForm";

import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const FormCompra = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const { setCart, cart, totalPrice } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [directions, setDirections] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState({
    mp: false,
    rapipago: false,
    pago_facil: false,
    order: false,
    waiting_for_payment: false,
    get_user_info: false,
    get_direction: false,
  });
  const [errors, setErrors] = useState({
    number: "",
    name: "",
    dni: "",
    street: "",
    numberStreet: "",
    cp: "",
  });

  const [shipmentInfo, setShipmentInfo] = useState({
    name: "",
    dni: "",
    email: "",
    numberPhone: "",
    street: "",
    numberStreet: "",
    cp: "",
    comments: "",
    pay: "",
  });
  const [order, setOrder] = useState({
    order_total: "",
    order_state: "",
    order_id: "",
    order_methodPay: "",
  });

  useEffect(() => {
    initMercadoPago("APP_USR-65f65682-ae60-4130-a015-397f105a5610", {
      locale: "es-AR",
    });

    getUserInfo();
    getDIrectionInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return errors.name === "" && errors.number === "" && errors.dni === "";
      case 1:
        return (
          errors.street === "" && errors.numberStreet === "" && errors.cp === ""
        );
      case 2:
        return shipmentInfo.pay !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepComplete(step)) {
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

  const getUserInfo = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        get_user_info: true,
      }));
      const response = await api.get("/my-user-info/");

      if (response.status === 200) {
        const { username, dni, phone_number, email } = response.data;

        if (username) {
          setShipmentInfo((prevState) => ({
            ...prevState,
            name: username,
          }));
        } else {
          setShipmentInfo((prevState) => ({
            ...prevState,
            name: "",
          }));
        }

        if (dni) {
          setShipmentInfo((prevState) => ({
            ...prevState,
            dni: dni,
          }));
        } else {
          setShipmentInfo((prevState) => ({
            ...prevState,
            dni: "",
          }));
        }

        if (phone_number) {
          setShipmentInfo((prevState) => ({
            ...prevState,
            numberPhone: phone_number,
          }));
        } else {
          setShipmentInfo((prevState) => ({
            ...prevState,
            numberPhone: "",
          }));
        }

        if (email) {
          setShipmentInfo((prevState) => ({
            ...prevState,
            email: email,
          }));
        } else {
          setShipmentInfo((prevState) => ({
            ...prevState,
            email: "",
          }));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        get_user_info: false,
      }));
    }
  };

  const getDIrectionInfo = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        get_direction: true,
      }));

      const response = await api.get("/directions/");
      if (response.status === 200) {
        setDirections(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        get_direction: false,
      }));
    }
  };

  const productToSend = cart.map((product) => ({
    product: product.product_detail.id,
    quantity: product.quantity,
    price: product.product_detail.final_price
      ? product.product_detail.final_price
      : product.product_detail.price,
  }));

  const handleFormSubmit = async (event) => {
    try {
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

      setLoading((prevState) => ({
        ...prevState,
        order: true,
      }));
      const response = await api.post("/orders/", payInf);
      const responseData = response.data;

      if (response.status === 201) {
        setOrder({
          order_total: responseData.total_amount,
          order_state: responseData.status,
          order_id: responseData.id,
          order_methodPay: responseData.payment_method,
        });

        if (responseData.payment_method === "mercado-pago") {
          setPreferenceId(response.data.mercadopago.preference_id);
        } else {
          setPreferenceId(null);
        }
        setShowConfirmation(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        order: false,
      }));
    }
  };

  const orderConfirmation = () => {
    setShipmentInfo({
      name: "",
      dni: "",
      email: "",
      numberPhone: "",
      street: "",
      numberStreet: "",
      cp: "",
      comments: "",
      pay: "",
    });
    setStep(0);
    setCart([]);
    navigate("/myAccount?section=orders");
  };

  function formatPrice(price) {
    const numericPrice = Number(price);

    return numericPrice.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConfirmation]);

  return (
    <>
      <div className="px-4  sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-6 lg:py-8">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-start gap-10 lg:mx-10">
          {/* ----------- FORM ---------------- */}
          <div className="col-lg-7 col-md-8 col-sm-12 w-full lg:min-w-[600px] rounded-[32px] px-4 py-8 glass-box relative">
            <form onSubmit={handleFormSubmit} className="mt-4">
              <StepsForm step={step} isStepComplete={isStepComplete} />

              <div>
                {step === 0 && (
                  <RecipientForm
                    shipmentInfo={shipmentInfo}
                    setShipmentInfo={setShipmentInfo}
                    setErrors={setErrors}
                    errors={errors}
                    loading={loading}
                  />
                )}

                {step === 1 && (
                  <DirectionForm
                    shipmentInfo={shipmentInfo}
                    setShipmentInfo={setShipmentInfo}
                    setErrors={setErrors}
                    errors={errors}
                    directions={directions}
                    loading={loading}
                  />
                )}

                {step === 2 && (
                  <PayForm
                    setShipmentInfo={setShipmentInfo}
                    shipmentInfo={shipmentInfo}
                  />
                )}
              </div>

              <div className="flex justify-center items-center mt-5">
                {step === 0 ? (
                  <button
                    type="button"
                    onClick={() => handleNext()}
                    className="btn-glass w-[80%]"
                  >
                    CONTINUAR
                  </button>
                ) : step === 1 ? (
                  <button
                    type="button"
                    onClick={() => handleNext()}
                    className="btn-glass w-[80%]"
                  >
                    CONTINUAR
                  </button>
                ) : (
                  <button type="submit" className="btn-glass w-[80%]">
                    {loading.order ? <Loading /> : <p>COMPRAR</p>}
                  </button>
                )}
              </div>
            </form>

            <div className="yellow-glow absolute top-0 w-[120%] h-[10%]"></div>
          </div>

          {/* ------------- CART ---------------- */}
          <div className="col-lg-4 col-md-4 col-12 border border-black/25 rounded-[32px] px-4 py-10 bg-[#fce803] backdrop-blur shadow-[inset_0_4px_6px_rgba(0,0,0,0.4)]">
            <ul className="p-0">
              {cart.map((product) => (
                <li key={product.product_detail.id}>
                  <div className="flex gap-5 mt-2">
                    <div className="w-40">
                      {product.product_detail.images ? (
                        <img
                          className="w-full object-cover"
                          src={product.product_detail.images[0].image}
                          alt={product.product_detail.name}
                        />
                      ) : (
                        <img
                          src="https://static.wikia.nocookie.net/dragonball/images/e/ea/Goku_Mini_Art_%28DBD%29.png/revision/latest/scale-to-width/360?cb=20250210015816&path-prefix=es"
                          alt=""
                        />
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-black">
                        {product.product_detail.name}
                      </h2>

                      <div className="flex items-center gap-2 text-black/85">
                        <p className="text-base font-medium">
                          {formatPrice(product.total_price)}
                        </p>
                        <p className="text-sm font-light text-black/85">
                          x{product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="w-full m-0 my-5 bg-black/10 border-0 h-px" />
                </li>
              ))}
            </ul>

            <div className="flex gap-2 items-center justify-end mt-6 mb-3 me-3 text-end text-lg font-medium text-black">
              <p className="font-light">Total:</p>
              <h3>{formatPrice(totalPrice)}</h3>
            </div>
          </div>
        </div>

        {/* ------------- CONFIRTMATION ---------------- */}
        {showConfirmation && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
            <div className="glass-box relative px-6 py-10 max-w-[35%]">
              <div className="relative">
                <div>
                  <p className="text-white/85 text-xl font-light">Total:</p>
                  <p className="text-white mt-2 text-4xl font-semibold ms-5">
                    {formatPrice(order.order_total)}
                  </p>
                </div>

                <hr className="w-full mt-2 border-t-1 border-white/10" />

                <div className="mt-3">
                  <p className="text-white/85 text-xl font-light">
                    Metodo de pago:
                  </p>
                  <p className="border uppercase rounded-md border-white/15 text-white/85 p-4 mt-2 backdrop-blur-md ms-5 font-medium">
                    {order.order_methodPay} - AR
                  </p>
                </div>
                <div className="mt-5">
                  <div className=" border rounded-md text-xs border-white/15 text-white/85 p-4 mt-2 backdrop-blur-md ms-5 font-medium">
                    Para retirar el producto en local se pedira el numero de
                    orden, lo podras consultar en tus ordenes
                  </div>
                </div>

                <div className="absolute top-1 right-1">
                  {order.order_state === "pending" ? (
                    <p className="text-sm font-medium text-green-600">
                      En espera de pago
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-green-600">
                      En espera de entrega
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center mt-5">
                  <div>
                    <p className="text-xs text-[#fce803] mb-2">
                      El horario de atencion es de 08 a 16hs
                    </p>
                  </div>

                  <div className="w-full">
                    {order.order_methodPay === "mercado-pago" &&
                    preferenceId ? (
                      <Wallet
                        initialization={{ preferenceId: preferenceId }}
                        customization={{ texts: { value: "buy" } }}
                      />
                    ) : (
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="btn-glass w-[80%]"
                          onClick={orderConfirmation}
                        >
                          Confirmar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormCompra;
