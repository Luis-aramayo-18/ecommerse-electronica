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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-full">
      <section className="hidden lg:block text-5xl font-semibold">
        <h2>Compras</h2>
      </section>

      <section className="h-full relative">
        <div className="flex flex-col">
          {orders && orders.length > 0 ? (
            <div>
              {orders.map((order, idx) => (
                <div
                  key={order.id || idx}
                  className="flex flex-col lg:flex-row gap-2 w-full p-2 relative border-b mb-5"
                >
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="w-full h-full lg:w-80 lg:h-44 flex items-center">
                      {order.order_items[0].product.images &&
                      order.order_items[0].product.images.length > 0 ? (
                        <img
                          className="w-full object-contain"
                          src={order.order_items[0].product.images[0].image}
                          alt={order.order_items[0].product.name}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                  )}
                  <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center absolute right-0 lg:left-0 top-0 border border-gray-500">
                    <p className="text-xl font-semibold">
                      {order.order_items.length}
                    </p>
                  </div>
                  <div className="relative w-full flex flex-col items-start justify-center p-2 gap-1 text-[#a8acb0]">
                    <p className="hidden lg:block absolute right-1 top-3 text-xs font-medium">
                      {order.status}
                    </p>
                    <p className="lg:text-xl text-xs font-medium ">{order.order_date}</p>
                    <p className="font-semibold text-sm lg:text-xl">
                      <span className="font-medium">Total:</span> $
                      {order.total_amount}
                    </p>
                    <button
                      className="border p-2 cursor-pointer text-sm mt-2"
                      onClick={() => handleOpenModal(order)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              ))}
              {modalOrder && selectedOrder && (
                <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm	 flex justify-center items-center">
                  <div className=" bg-black/40 p-2 shadow-md shadow-slate-300 rounded-xl relative z-30">
                    <div className="flex flex-col lg:flew-row w-full gap-4">
                      <div className="flex flex-col justify-center items-center text-[#a8acb0]">
                        <h3 className="text-base font-semibold">productos {selectedOrder.order_items.length}</h3>
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
                                <p className="text-xs font-medium">{item.product.name}</p>
                                <p className="text-xs font-medium">
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

                      <div className="mt-5 text-[#a8acb0] p-4">
                        <h3 className="text-base font-semibold">Detalles de la orden</h3>
                        <hr className="my-5 w-[70%]" />
                        <p className="text-xs font-light">{selectedOrder.status}</p>
                        <p className="text-sm font-medium">
                          Cliente: {selectedOrder.name}{" - "}
                          <span>{selectedOrder.phone_number}</span>
                        </p>
                        <p className="text-sm font-medium">
                          Domicilio: {selectedOrder.street}{" "}
                          <span>{selectedOrder.number_of_street}</span>
                        </p>
                        <p className="text-sm font-medium">Metodo de pago: {selectedOrder.payment_method}</p>
                        <p className="text-xs font-medium mt-3">
                          Total: $
                          {new Intl.NumberFormat("es-CO", {
                            style: "decimal",
                            minimumFractionDigits: 0,
                          }).format(selectedOrder.total_amount)}
                        </p>
                      </div>
                    </div>

                    <div
                      className="absolute right-4 top-2"
                      onClick={handleCloseModal}
                    >
                      <i className="bx bx-x text-2xl text-red-500"></i>
                    </div>
                    <div className="hidden absolute bottom-5 right-10">
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
