import React, { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/useAxios";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../Loading";
import { useCart } from "../../Hooks/useCart";
import NextArrowSlider from "../../NextArrowSlider";
import PrevArrowSlider from "../../PrevArrowSlider";
import { Bounce, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const OrdersProfile = ({ setShowConfirmation, setMessageConfirmation }) => {
  const api = useAxios();
  const { formatPrice, addToCart, addToMultiplateItems, loading } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [itemSelectedForReview, setItemSelectedForReview] = useState(null);
  const [messageComment, setMessageComment] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    getOrder: null,
  });
  const [loading2, setLoading2] = useState({
    getOrders: false,
    getOrder: false,
    mp_Pay: false,
  });
  const [formActive, setFormActive] = useState({
    formProduct: false,
    formPage: false,
    formContact: false,
  });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(false);

  useEffect(() => {
    const paymentSuccess = searchParams.get("paymentSuccess");
    const paymentFailed = searchParams.get("paymentFailed");
    const paymentPending = searchParams.get("paymentPending");
    const orderId = searchParams.get("orderId");

    if (orderId) {
      getOrderDetails(orderId);
      if (paymentSuccess === "true") {
        setShowConfirmation(true);
        setMessageConfirmation("paymentSuccess");
      }

      if (paymentFailed === "true") {
        setShowConfirmation(true);
        setMessageConfirmation("paymentFailed");
      }

      if (paymentPending === "true") {
        setShowConfirmation(true);
        setMessageConfirmation("paymentPending");
      }
    } else {
      loadOrdersUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrderDetails = async (orderId) => {
    try {
      setLoading2((prev) => ({ ...prev, getOrder: true }));
      const response = await api.get(`/orders/${orderId}/`);

      if (response.status === 200) {
        setOrderDetails(true);
        setSelectedOrder(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2((prev) => ({ ...prev, getOrder: false }));
    }
  };

  const loadOrdersUser = async () => {
    try {
      setLoading2((prev) => ({
        ...prev,
        getOrders: true,
      }));
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/orders/get-orders?user_id=${userId}`);

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      setErrorMessage((prev) => ({
        ...prev,
        getOrder: error.response.data.message,
      }));
    } finally {
      setLoading2((prev) => ({
        ...prev,
        getOrders: false,
      }));
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: false,
    nextArrow: <NextArrowSlider />,
    prevArrow: <PrevArrowSlider />,
  };

  const handleProductFormActive = (item) => {
    setFormActive((prev) => ({
      ...prev,
      formProduct: true,
    }));

    setItemSelectedForReview(item);
  };

  const handlePageFormActive = () => {
    setFormActive((prev) => ({
      ...prev,
      formPage: true,
    }));
  };

  const handleContactFormActive = () => {
    setFormActive((prev) => ({
      ...prev,
      formContact: true,
    }));
  };

  const formatNumberWithDots = (numberInput) => {
    if (numberInput === null || numberInput === undefined) {
      return "";
    }

    let num = parseFloat(numberInput);

    if (isNaN(num)) {
      return "N/A";
    }

    if (num % 1 === 0) {
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    } else {
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }
  };

  const handleShowOrderDetails = (orderId) => {
    const order = orders.find((order) => order.id === orderId);

    setSelectedOrder(order);
    setOrderDetails(true);

    const currentParams = Object.fromEntries(searchParams.entries());

    setSearchParams({ ...currentParams, orderId: orderId });
  };

  const handleCloseDetailsOrders = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    delete currentParams.orderId;

    setSearchParams(currentParams);
    setOrderDetails(false);
    setFormActive((prev) => ({
      ...prev,
      formProduct: false,
    }));

    loadOrdersUser();
  };

  const handleProductReview = async (e) => {
    try {
      e.preventDefault();
      const commentData = {
        rating: rating,
        comment_text: comment,
        product: itemSelectedForReview,
      };
      const response = await api.post("/comments/", commentData);

      if (response.status === 201) {
        setComment(null);
        setRating(0);
        setTimeout(() => {
          setMessageComment(true);
        }, 3000);
      }
    } catch (error) {
      const errorFields = error.response.data.non_field_errors;
      const errorLogin = error.response.data.message;
      if (error.response) {
        if (errorFields) {
          toast.error(`${errorFields}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          setComment(null);
          setRating(0);
        }
      }
      if (error.response.status === 401) {
        toast.error(`${errorLogin}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const handleRepuchase = (items) => {
    if (items.length > 1) {
      const cartItems = items.map((item) => {
        const productId = item.product_detail.id;
        const quantity = item.quantity;

        if (productId) {
          return {
            product_id: productId,
            quantity: quantity,
          };
        } else {
          return null;
        }
      });

      addToMultiplateItems(cartItems);
    } else {
      const item = items[0];
      const product = {
        id: item.product_detail.id,
        quantity: item.quantity,
      };
      console.log(product);

      addToCart(product);
    }
  };

  const handleMpPay = async (order) => {
    try {
      setLoading2((prevState) => ({
        ...prevState,
        mp_pay: true,
      }));

      const response = await api.post(
        `/orders/${order.id}/re-create-preference/`
      );
      console.log(response);

      if (response.status === 200) {
        const initPoint = response.data.init_point;
        window.location.href = initPoint;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2((prevState) => ({
        ...prevState,
        mp_pay: false,
      }));
    }
  };

  return (
    <div className="w-full flex flex-col justify-between mt-5 lg:mt-0 lg:px-4 lg:py-10 lg:glass-box relative overflow-visible">
      <section
        className={`relative  ${
          orderDetails
            ? "h-[964px]"
            : "min-h-[250px] max-h-[600px] overflow-y-auto overflow-x-hidden"
        } `}
      >
        <div className="">
          {loading2.getOrders || loading2.getOrder ? (
            <Loading />
          ) : errorMessage.getOrder ? (
            <p className="text-sm font-medium text-white/85">
              {errorMessage.getOrder}
            </p>
          ) : (
            <div>
              <div>
                {orders.map((order, idx) => (
                  <div
                    className={`group transition-all duration-500 ease-in-out rounded-2xl hover:bg-[#fce803] cursor-pointer px-4 py-6 ${
                      orderDetails
                        ? "-translate-x-full opacity-0"
                        : "translate-x-0 opacity-100"
                    }`}
                    key={order.id || idx}
                    onClick={() => handleShowOrderDetails(order.id)}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium text-green-400 group-hover:text-green-600">
                        {order.status}
                      </p>
                      <button className="text-sm font-medium text-white/85 group-hover:text-black/85">
                        Volver a comprar
                      </button>
                    </div>

                    <div className="flex gap-6 mt-5">
                      {order.order_items[0]?.product_detail?.images[0] ? (
                        <img
                          src={
                            order.order_items[0].product_detail.images[0].image
                          }
                          alt={order.order_items[0].product_detail.name}
                          className="h-24 w-24"
                        />
                      ) : (
                        <img
                          src="https://i.redd.it/who-would-win-in-a-fight-between-goku-and-ichigo-v0-k0ir8etzznpe1.jpg?width=1080&format=pjpg&auto=webp&s=309961267015b19593eb43cf9dbcf01f17ae2137"
                          alt=""
                          className="h-24 w-24 object-cover"
                        />
                      )}
                      <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-white/85 text-sm font-extralight group-hover:text-black/85">
                            N° De Orden:
                          </p>
                          <h2 className="text-[#fce803] group-hover:text-green-600 font-semibold">
                            {order.id}
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-white/85 text-sm font-extralight group-hover:text-black/85">
                            Total:
                          </p>
                          <h2 className="text-white group-hover:text-green-600 font-semibold">
                            ${formatPrice(order.total_amount)}
                          </h2>
                        </div>
                        <p className="text-white text-sm font-medium group-hover:text-black">
                          Entregado el 14 de mayo
                        </p>
                        <p className="text-white/75 text-sm font-extralight group-hover:text-black/75">
                          {order.order_items.length} productos
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`
            absolute top-0 left-0 w-full h-full
            transition-all duration-500 ease-in-out overflow-x-hidden
            ${
              orderDetails
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }
          `}
              >
                <div className="overflow-y-auto overflow-x-hidden relative h-full">
                  <div className="mb-5 text-sm font-medium text-[#fce803]">
                    <h2>Detalles De Los Productos.</h2>
                  </div>
                  {selectedOrder && (
                    <div>
                      <div className="relative">
                        <div
                          className={`${messageComment ? "hidden" : "block"}`}
                        >
                          <Slider {...settings}>
                            {selectedOrder.order_items.map((item, idx) => (
                              <div
                                className="h-[208px] relative"
                                key={item.id || idx}
                              >
                                <div
                                  className={`flex gap-5 transition-all duration-500 ease-in-out ${
                                    formActive.formProduct
                                      ? "-translate-x-full opacity-0"
                                      : "translate-x-0 opacity-100"
                                  }`}
                                >
                                  {item.product_detail.images[0] ? (
                                    <img
                                      src={item.product_detail.images[0].image}
                                      alt={item.product_detail.name}
                                      className="w-44 h-52 object-cover rounded-2xl"
                                    />
                                  ) : (
                                    <img
                                      src="https://www.ole.com.ar/2023/08/15/i5wSOgHoA_1290x760__2.jpg"
                                      alt=""
                                      className="w-44 h-52 object-cover rounded-2xl"
                                    />
                                  )}

                                  <div className="flex flex-col justify-between gap-2 w-full">
                                    <div className="flex flex-col gap-1">
                                      <p className="text-lg font-semibold text-white">
                                        {item.product_detail.name}
                                      </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-light text-white/85">
                                        Precio:
                                      </p>
                                      <p className="font-medium text-sm text-white/90">
                                        $
                                        {formatPrice(item.product_detail.price)}
                                      </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-light text-white/85">
                                        Descuento:
                                      </p>
                                      <p className="font-medium text-sm text-white/90">
                                        {
                                          item.product_detail
                                            .discount_percentage
                                        }
                                      </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-light text-white/85">
                                        Precio Final:
                                      </p>
                                      <p className="font-medium text-sm text-white/90">
                                        ${formatPrice(item.price)}
                                      </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="font-light text-xs text-white/85">
                                        Cantidad:
                                      </p>
                                      <p className="font-medium text-sm text-white/90">
                                        {item.quantity}
                                      </p>
                                    </div>

                                    <button
                                      className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[40%]"
                                      onClick={() =>
                                        handleProductFormActive(
                                          item.product_detail.id
                                        )
                                      }
                                    >
                                      Opinar de este producto
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>

                          <form
                            onSubmit={handleProductReview}
                            className={`w-full absolute left-1 top-0 transition-all duration-500 ease-in-out ${
                              formActive.formProduct
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                          >
                            <div className="mb-4 flex items-center gap-2 w-[10%]">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className={`text-xl flex items-center justify-center ${
                                    star <= rating
                                      ? "text-[#fce803]"
                                      : "text-white/65"
                                  }`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>

                            <div className="flex items-end gap-2">
                              <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                name=""
                                id=""
                                required
                                placeholder="Dejanos tu opinion del producto !"
                                className="text-white placeholder:text-sm rounded-2xl w-[82%] px-4 pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
                              ></textarea>

                              <div className="flex flex-col w-[50%] lg:w-[14%]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormActive((prev) => ({
                                      ...prev,
                                      formProduct: false,
                                    }))
                                  }
                                  className="btn-glass-sm lg:btn-glass p-2 h-[10%] mt-3"
                                >
                                  Volver
                                </button>

                                <button
                                  type="submit"
                                  className="btn-glass-sm lg:btn-glass p-2 h-[10%] mt-3"
                                >
                                  Enviar
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div
                          className={`${
                            messageComment
                              ? "flex justify-center items-center gap-2 h-[214px]"
                              : "hidden"
                          } `}
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-10 text-green-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </div>

                          <div className="font-semibold text-2xl text-white">
                            <p>Comentario enviado exitosamente</p>
                          </div>
                        </div>
                      </div>

                      <hr className="w-full my-8 m-0 bg-white/15 border-0 h-px" />

                      <div className="relative flex flex-col gap-2">
                        <div className="mb-2 text-sm font-medium text-[#fce803]">
                          <h2>Detalles De La Compra.</h2>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Estado:
                          </p>
                          <p className="font-medium text-sm text-green-400">
                            {selectedOrder.status}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            N° De Orden:
                          </p>
                          <p className="font-medium text-sm text-white/90">
                            {selectedOrder.id}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Total:
                          </p>
                          <p className="font-medium text-sm text-white/90">
                            ${formatPrice(selectedOrder.total_amount)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            DNI:
                          </p>
                          <p className="font-medium text-sm text-white/90">
                            {formatNumberWithDots(selectedOrder.dni)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Metodo De Pago:
                          </p>
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-sm text-white/90 first-letter:uppercase">
                              {selectedOrder.payment_method} - AR
                            </p>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-green-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Fecha De Compra:
                          </p>
                          <p className="font-medium text-sm text-white/90">
                            {selectedOrder.order_date}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Fecha De Entrega:
                          </p>
                          <p className="font-medium text-sm text-white/90">
                            10 De Diciembre{" "}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-xs font-light text-white/85">
                            Detalle de envio:
                          </p>
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-sm text-white/90">
                              {selectedOrder.street} {" - "}{" "}
                              {selectedOrder.number_of_street}
                            </p>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="flex gap-5 mt-5">
                          {selectedOrder.status === "delivered" && (
                            <div>
                              <button
                                disabled
                                className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[30%]"
                              >
                                Ver Factura
                              </button>

                              <button
                                className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[30%]"
                                onClick={() =>
                                  handleRepuchase(selectedOrder.order_items)
                                }
                              >
                                {loading.addMultiplateItems ||
                                loading.addToCart ? (
                                  <Loading />
                                ) : (
                                  <p>Volver A Comprar</p>
                                )}
                              </button>
                            </div>
                          )}

                          {selectedOrder.payment_method === "mercado-pago" &&
                            selectedOrder.status === "pending" && (
                              <button
                                onClick={() => handleMpPay(selectedOrder)}
                                disabled={loading2.mp_pay}
                                className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[30%]"
                              >
                                {loading2.mp_pay ? (
                                  <Loading />
                                ) : (
                                  <p>Continuar con el pago</p>
                                )}
                              </button>
                            )}
                        </div>
                      </div>

                      <hr className="w-full my-8 m-0 bg-white/15 border-0 h-px" />

                      <div>
                        <div className="mb-5 text-sm font-medium text-[#fce803]">
                          <h2>Ayuda Con La Compra.</h2>
                        </div>

                        <div className="relative min-h-[200px]">
                          <div
                            className={`flex flex-col items-start gap-2 transition-all duration-500 ease-in-out ${
                              formActive.formPage
                                ? "-translate-x-full opacity-0"
                                : "translate-x-0 opacity-100"
                            }`}
                          >
                            <button
                              onClick={() => handlePageFormActive()}
                              className="text-sm font-light text-white lg:text-white/75 lg:transition-all lg:duration-100 lg:hover:text-white"
                            >
                              Quiero opinar sobre mi experiencia de compra.
                            </button>
                            <button
                              onClick={() => handleContactFormActive()}
                              className="text-sm font-light text-white lg:text-white/75 lg:transition-all lg:duration-100 lg:hover:text-white"
                            >
                              Tengo un problema con mi compra.
                            </button>
                          </div>

                          <div
                            className={`absolute left-1 top-0 w-full h-full ${
                              formActive.formPage
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              <h4 className="text-sm text-white/75 font-light">
                                Cuentanos, como fue tu experiencia de compra
                                desde la web !
                              </h4>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 text-[#fce803]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                                />
                              </svg>
                            </div>

                            <div className="flex items-end gap-2 mt-5">
                              <textarea
                                name=""
                                id=""
                                required
                                placeholder=""
                                className="text-white placeholder:text-sm rounded-2xl w-[82%] px-4 pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
                              ></textarea>

                              <button className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[14%] h-[10%] mt-3">
                                Enviar
                              </button>
                            </div>
                          </div>

                          <div
                            className={`absolute left-0 top-0 w-full h-full ${
                              formActive.formContact
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              <h4 className="text-sm text-white/75 font-light">
                                Por favor, cuentanos el problema que estas
                                teniendo, estaremos contactandonos a la brevedad
                                por Email.
                              </h4>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 text-[#fce803]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                />
                              </svg>
                            </div>

                            <div className="flex items-end gap-2 mt-5">
                              <textarea
                                name=""
                                id=""
                                required
                                placeholder=""
                                className="text-white placeholder:text-sm rounded-2xl w-[82%] px-4 pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
                              ></textarea>

                              <button className="btn-glass-sm lg:btn-glass p-2 w-[50%] lg:w-[14%] h-[10%] mt-3">
                                Enviar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="absolute top-0 right-0"
                        onClick={() => handleCloseDetailsOrders()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="yellow-glow absolute w-[40%] h-[30%] right-[0] bottom-0"></section>
    </div>
  );
};

export default OrdersProfile;
