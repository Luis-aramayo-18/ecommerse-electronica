import React, { useEffect, useState } from "react";
import { useAxios } from "../Hooks/useAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../Hooks/useCart";
import { useSearchParams } from "react-router-dom";
import Orders from "./components/Orders";
import OrdersDetails from "./components/OrdersDetails";
import Loading from "../Loading";

const OrdersProfile = ({ setShowConfirmation, setMessageConfirmation }) => {
  const api = useAxios();
  const { formatPrice } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState({
    getOrder: null,
  });
  const [loading2, setLoading2] = useState({
    getOrders: false,
    getOrder: false,
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

      const response = await api.get(`/orders/get-orders`);
      
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
  
  return (
    <section
      className={`w-full lg:glass-box relative overflow-hidden ${
        orderDetails ? "lg:h-[950px]" : "lg:h-[600px]"
      }`}
    >
      {loading2.getOrders ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div
          className={`transition-all lg:px-4 lg:py-10
              duration-500 ease-in-out absolute top-0
              left-0 w-full h-full overflow-y-auto thin-scrollbar ${
                orderDetails
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
        >
          <Orders
            orders={orders}
            orderDetails={orderDetails}
            searchParams={searchParams}
            errorMessage={errorMessage}
            formatPrice={formatPrice}
            setSelectedOrder={setSelectedOrder}
            setOrderDetails={setOrderDetails}
            setSearchParams={setSearchParams}
          />
        </div>
      )}

      {selectedOrder && (
        <div
          className={`absolute top-0 left-0 w-full h-full
            transition-all duration-500 ease-in-out
            px-6 py-10 overflow-y-auto thin-scrollbar ${
              orderDetails
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
        >
          <OrdersDetails
            selectedOrder={selectedOrder}
            searchParams={searchParams}
            orderDetails={orderDetails}
            setSearchParams={setSearchParams}
            setOrderDetails={setOrderDetails}
            loadOrdersUser={loadOrdersUser}
          />
        </div>
      )}

      <div className="yellow-glow absolute w-[40%] h-[30%] right-[0] bottom-0"></div>
    </section>
  );
};

export default OrdersProfile;
