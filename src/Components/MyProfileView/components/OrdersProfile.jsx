import React, { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/useAxios";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OrdersProfile = () => {
  const api = useAxios();

  const [orders, setOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrderUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await api.get(`/orders/get_orders?user_id=${userId}`);

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadOrderUser();
  }, []);

  const handleOpenModal = (order) => {
    setModalOrder(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setModalOrder(false);
    setSelectedOrder(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-full">
      <section className="text-5xl font-semibold">
        <h2>Compras</h2>
      </section>

      <section className="h-full relative">
        <div className="flex flex-col">
          {orders && orders.length > 0 ? (
            <div>
              {orders.map((order, idx) => (
                <div
                  key={order.id || idx}
                  className="flex gap-2 w-full p-2 border relative"
                >
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="w-80 h-44 flex items-center">
                      {order.order_items[0].product.images &&
                      order.order_items[0].product.images.length > 0 ? (
                        <img
                          className="w-full object-cover"
                          src={order.order_items[0].product.images[0].image}
                          alt={order.order_items[0].product.name}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                  )}
                  <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center absolute left-0 top-0 border border-gray-500">
                    <p className="text-xl font-semibold">
                      {order.order_items.length}
                    </p>
                  </div>
                  <div className="relative w-full flex flex-col items-start justify-center p-2 gap-1">
                    <p className="absolute right-1 top-3 text-xs font-medium">
                      {order.status}
                    </p>
                    <h4 className="text-xl font-medium">{order.order_date}</h4>
                    <p className="font-semibold text-xl">
                      <span className="font-medium">Total:</span> $
                      {order.total_amount}
                    </p>
                    <button
                      className="border p-2 cursor-pointer"
                      onClick={() => handleOpenModal(order)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              ))}
              {modalOrder && selectedOrder && (
                <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm	 flex justify-center items-center">
                  <div className=" bg-rose-500 p-2 rounded-lg relative z-30">
                    <div className="flex w-full gap-4">
                      <div className="w-96 flex flex-col justify-center items-center">
                        <h3>productos {selectedOrder.order_items.length}</h3>
                        <hr />
                        <Slider {...settings} className="w-72 p-4">
                          {selectedOrder.order_items.map((item, idx) => (
                            <div
                              key={item.id || idx}
                              className="flex justify-center"
                            >
                              {item.product.images.length > 0 && (
                                <div className="w-full flex items-center justify-center">
                                  <img
                                    src={item.product.images[0].image}
                                    alt={item.product.name}
                                    className="w-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col items-center mt-2">
                                <p>{item.product.name}</p>
                                <p>
                                  <span className="me-2">x{item.quantity}</span>
                                  $
                                  {new Intl.NumberFormat("es-CO", {
                                    style: "decimal",
                                    minimumFractionDigits: 0,
                                  }).format(item.product.final_price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>

                      <div>
                        <h3>detalles de la orden</h3>
                        <hr />
                        <p>{selectedOrder.status}</p>
                        <p>
                          cliente: {selectedOrder.name}{" "}
                          <span>{selectedOrder.phone_number}</span>
                        </p>
                        <p>
                          Domicilio: {selectedOrder.street}{" "}
                          <span>{selectedOrder.number_of_street}</span>
                        </p>
                        <p>Metodo de pago: {selectedOrder.payment_method}</p>
                        <p>
                          Total: $
                          {new Intl.NumberFormat("es-CO", {
                            style: "decimal",
                            minimumFractionDigits: 0,
                          }).format(selectedOrder.total_amount)}
                        </p>
                      </div>
                    </div>

                    <div
                      className="absolute right-0 top-0 bg-white"
                      onClick={handleCloseModal}
                    >
                      <i className="bx bx-x text-2xl text-red-500"></i>
                    </div>
                    <div className="absolute bottom-5 right-10">
                      <button type="button" className="border p-4">
                        Eliminar orden
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute top-[35%] text-3xl text-gray-500 font-medium font-stretch-extra-expanded">
              <p>No Tienes compras aun</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersProfile;
