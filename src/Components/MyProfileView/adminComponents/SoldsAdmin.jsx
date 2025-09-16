import React, { useEffect, useRef, useState } from "react";
import Loading from "../../Loading";
import { debounce } from "lodash";
import Select from "react-select";
import { useAxios } from "../../Hooks/useAxios";

const SoldsAdmin = () => {
  const api = useAxios();
  const modalOrder = useRef();
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredOrdersToDeliver, setFilteredOrdersToDeliver] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [openModalOrder, setOpenModalOrder] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    getSuggestions: false,
  });
  const [loading, setLoading] = useState({
    post: false,
    search: false,
    get: false,
    updateStatusOrder: false,
    delete: false,
    seeMore: false,
    getOrdersToDeliver: false,
  });
  const stateOptions = [
    { value: "pending", label: "Pendiente De Pago" },
    { value: "paid", label: "Pagado - En Espera De Entrega" },
    { value: "delivered", label: "Entregado" },
    { value: "canceled", label: "Cancelado" },
    { value: "stock_issue", label: "Problema De Stock" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);

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
      backdropFilter: "blur(12px)",
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
      color: state.isSelected ? "#fce803" : "rgb(255,255,255, 0.75)",
      cursor: "pointer",
      "&:hover": {
        color: state.isSelected ? "" : "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.65)",
    }),
  };

  const fetchLastOrders = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true }));
      const response = await api.get("/orders/");

      if (response.status === 200) {
        setOrders(response.data.results);
        setFilteredOrders(response.data.results);
      }

      if (response.data.next) {
        const nextUrl = response.data.next;

        if (nextUrl) {
          const urlObj = new URL(nextUrl);

          let relativeUrl = urlObj.pathname + urlObj.search;

          if (relativeUrl.startsWith("/api/")) {
            relativeUrl = relativeUrl.replace("/api", "");

            setNextPage(relativeUrl);
          }
        }
      } else {
        setNextPage(null);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const fetchOrdersToDeliver = async () => {
    try {
      setLoading((prev) => ({ ...prev, getOrdersToDeliver: true }));
      const response = await api.get("/orders/get-orders-to-deliver/");
      if (response.status === 200) {
        setFilteredOrdersToDeliver(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, getOrdersToDeliver: false }));
    }
  };

  const handleSearchOrder = (e) => {
    const query = e.target.value;
    setSearchOrder(query);
  };

  const fetchSuggestions = async (searchedOrder) => {
    try {
      setLoading((prev) => ({ ...prev, search: true }));
      const response = await api.get(`/orders/search/?search=${searchedOrder}`);

      if (response.status === 200) {
        const suggestion = response.data;
        setOrders(suggestion);
        setFilteredOrders(suggestion);
      }
    } catch (error) {
      if (error) {
        setErrorMessage((prev) => ({
          ...prev,
          getSuggestions: error.response.data.message,
        }));
      }
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const deleteSuggestions = () => {
    setErrorMessage((prev) => ({
      ...prev,
      getSuggestions: false,
    }));
    setSearchOrder("");
    fetchLastOrders();
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading((prev) => ({ ...prev, updateStatusOrder: true }));
      const response = await api.patch(`orders/${orderId}/update-status/`, {
        status: status,
      });

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      throw error;
    } finally {
      setLoading((prev) => ({ ...prev, updateStatusOrder: false }));
    }
  };

  const confirmedMessage = () => {
    setTimeout(() => {
      setConfirmedStatus(false);
      setOpenModalOrder(false);
      setChangeState(false);
    }, 2000);
  };

  const debouncedFetch = debounce(fetchSuggestions, 1000);

  useEffect(() => {
    fetchLastOrders();
    fetchOrdersToDeliver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchOrder === null) {
      return;
    }

    if (searchOrder.trim() !== "") {
      debouncedFetch(searchOrder);
    } else {
    }

    return () => {
      debouncedFetch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOrder]);

  const handleStatusChange = async (selectedOption) => {
    const response = await updateOrderStatus(
      selectedOrder[0].id,
      selectedOption.value
    );

    if (response.status === 200) {
      const updatedOrder = response.data;
      setSelectedStatus(selectedOption);
      setConfirmedStatus(true);
      confirmedMessage();
      setFilteredOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.id === updatedOrder.id) {
            return updatedOrder;
          }
          return order;
        });
      });

      if (updatedOrder.status === "pending" || updatedOrder.status === "paid") {
        setFilteredOrdersToDeliver((prevOrders) => [
          ...prevOrders,
          updatedOrder,
        ]);
      }
    }
  };

  const handleUpdateStatusToDeliver = async (orderId, status) => {
    try {
      const response = await updateOrderStatus(orderId, status);

      if (response && response.status === 200) {
        const updatedOrder = response.data;
        setFilteredOrdersToDeliver((prevOrders) => {
          return prevOrders.filter((order) => order.id !== updatedOrder.id);
        });
        setFilteredOrders((prevOrders) => {
          return prevOrders.map((order) => {
            if (order.id === updatedOrder.id) {
              return updatedOrder;
            }
            return order;
          });
        });
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const showModalOrder = (orderId) => {
    setTimeout(() => {
      if (modalOrder.current) {
        modalOrder.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 100);

    const currentOrden = orders.filter((order) => order.id === orderId);
    const initialStatus = stateOptions.find(
      (option) => option.value === currentOrden[0].status
    );

    setSelectedOrder(currentOrden);
    setOpenModalOrder(true);
    setSelectedStatus(initialStatus);
  };

  const closeModal = () => {
    setOpenModalOrder(false);
    setChangeState(false);
    setShowSeeMore(false);
    setConfirmedStatus(false);
  };

  const handleBack = () => {
    setChangeState(false);
    setShowSeeMore(false);
  };

  return (
    <div className="w-full flex flex-col justify-between mt-5 lg:mt-0 lg:px-4 lg:py-10 lg:glass-box">
      <div className="max-h-[460px] overflow-y-auto">
        <div className="flex items-center gap-1">
          <h2 className="uppercase font-semibold text-white">
            Pedidos para hoy
          </h2>
          <div className="bg-yellow-500 p-3 w-4 h-4 flex justify-center items-center rounded-full">
            <p className="font-medium text-sm">
              {filteredOrdersToDeliver.length}
            </p>
          </div>
        </div>

        <div>
          {loading.getOrdersToDeliver ? (
            <Loading />
          ) : (
            <ul>
              {filteredOrdersToDeliver.map((order) => (
                <li
                  key={order.id}
                  className="py-5 m-0 border-white/10 border-b"
                >
                  <div>
                    <h2 className="text-green-600 font-semibold text-sm">
                      {order.status}
                    </h2>
                  </div>

                  <div className="flex gap-10 items-start mt-2">
                    <div>
                      <div className="flex gap-2 items-center">
                        <p className="font-extralight text-white/85 text-sm">
                          Cliente:
                        </p>
                        <p className="text-white font-medium">{order.name}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-extralight text-white/85 text-sm">
                          N° De Orden:
                        </p>
                        <p className="text-white font-medium">{order.id}</p>
                      </div>
                    </div>

                    <ul className="list-disc list-outside text-white">
                      <li>
                        {order.order_items.map((item, idx) => (
                          <div key={item.id || idx} className="flex gap-1 font-medium text-[#fce803]">
                            <p>{item.product_detail.name}</p>
                            <p>- x{item.quantity}</p>
                            <p>- ${item.price}</p>
                          </div>
                        ))}
                      </li>
                    </ul>

                    <div className="flex gap-2 items-center">
                      <p className="font-extralight text-white/85 text-sm">
                        Total:
                      </p>
                      <p className="text-white font-medium">
                        ${order.total_amount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-5">
                    <button
                      className="btn-glass w-40"
                      disabled={loading.updateStatusOrder}
                      onClick={() =>
                        handleUpdateStatusToDeliver(order.id, "delivered")
                      }
                    >
                      {loading.updateStatusOrder ? (
                        <Loading bg={true} />
                      ) : (
                        <p>Entregado</p>
                      )}
                    </button>

                    <button className="btn-glass w-40">Ver detalle</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---- ORDENES ----- */}
      <div className="mt-10">
        <div>
          <h2 className="uppercase font-semibold text-white">
            Ultimas ordenes
          </h2>
        </div>

        <div className="relative flex items-center w-full lg:w-[40%] mt-5">
          <input
            type="text"
            placeholder="Ingresar ID de orden de compra"
            className="p-3 w-full bg-black/30 border placeholder:text-sm text-white border-white/25 backdrop-blur rounded-2xl"
            value={searchOrder}
            onChange={handleSearchOrder}
          />
          {loading.search ? (
            <Loading className="absolute right-4" />
          ) : searchOrder ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 absolute right-4 cursor-pointer text-white"
              onClick={deleteSuggestions}
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 absolute right-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <div className="mt-10 px-4">
          <table className="min-w-full py-10">
            <thead className="text-white">
              <tr className="">
                <th className="w-[20%]">Numero De Orden</th>
                <th className="w-[20%]">Productos</th>
                <th className="w-[15%]">Monto Total</th>
                <th className="w-[20%]">Estado De Orden</th>
              </tr>
            </thead>

            <tbody className="">
              {errorMessage.getSuggestions ? (
                <tr className="relative">
                  <td colSpan="X" className=" text-white/85">
                    {errorMessage.getSuggestions}
                  </td>
                </tr>
              ) : (
                <>
                  {filteredOrders.map((order) => (
                    <tr
                      onClick={() => showModalOrder(order.id)}
                      key={order.id}
                      className="transition-all duration-100 text-white/85 rounded-2xl hover:bg-[#fce803] hover hover:backdrop-blur-md hover:text-black hover:cursor-pointer"
                    >
                      <td className="text-center  py-2">{order.id}</td>

                      <td className="text-center py-2">
                        {order.order_items.length}
                      </td>

                      <td className="text-center py-2">
                        ${order.total_amount}
                      </td>

                      <td className="text-center text-green-600 py-2">
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

          <div>
            {nextPage && <button className="p-4 border">ver mas</button>}
          </div>

          {openModalOrder && (
            <div
              ref={modalOrder}
              onClick={() => closeModal()}
              className="fixed inset-0 flex justify-center items-center top-0 w-full h-full"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-black backdrop-blur-sm rounded-2xl p-6 relative min-w-[50%] border border-white/15 ${
                  showSeeMore ? "min-h-[292px]" : "min-h-[162px]"
                }`}
              >
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-white/85">Orden</p>
                  <p className="text-2xl font-semibold text-white">
                    {selectedOrder[0].id}
                  </p>
                </div>

                <div className="relative">
                  <div>
                    <div
                      className={`flex gap-5 transition-all duration-500 ease-in-out absolute top-0 right-0 py-[10px] ${
                        changeState || showSeeMore
                          ? "-translate-x-full opacity-0"
                          : "translate-x-0 opacity-100"
                      }`}
                    >
                      <button
                        className="btn-glass w-[180px]"
                        onClick={() => setChangeState(true)}
                      >
                        Cambiar Estado
                      </button>
                      <button
                        className="btn-glass w-[180px]"
                        onClick={() => setShowSeeMore(true)}
                      >
                        Ver detalles
                      </button>
                    </div>

                    <div
                      className={`transition-all duration-500 ease-in-out w-full absolute top-0 right-0 ${
                        changeState
                          ? "translate-x-0 opacity-100"
                          : "translate-x-full opacity-0"
                      }`}
                    >
                      {loading.updateStatusOrder ? (
                        <div className="py-[10px] h-full flex items-center justify-center">
                          <Loading />
                        </div>
                      ) : confirmedStatus ? (
                        <div className="flex gap-2 items-center justify-center py-[10px] h-full">
                          <p className="text-lg font-semibold text-white uppercase">
                            Orden Acutalizada
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-green-600 font-medium"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <Select
                          className="w-full"
                          options={stateOptions}
                          styles={customStyles}
                          value={selectedStatus}
                          onChange={handleStatusChange}
                        />
                      )}
                    </div>

                    <div
                      className={`transition-all duration-500 ease-in-out w-full absolute top-0 right-0 ${
                        showSeeMore
                          ? "translate-x-0 opacity-100"
                          : "translate-x-full opacity-0"
                      }`}
                    >
                      <div className="mt-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-green-600 text-sm font-semibold">
                            Pagado - En espera de entrega
                          </p>

                          <p className="text-sm text-white/85 font-medium">
                            27 de junio
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p className="text-white/85 text-sm">Cliente:</p>
                          <p className="text-white font-medium">
                            {selectedOrder[0].name}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p className="text-white/85 text-sm">DNI:</p>
                          <p className="text-white font-medium">
                            {selectedOrder[0].dni}
                          </p>
                        </div>

                        <div className="flex items-start gap-1">
                          <p className="text-white/85 text-sm">Productos:</p>
                          <div>
                            {selectedOrder[0].order_items.map((item, idx) => (
                              <div className="flex gap-1 items-start" key={item.id || idx}>
                                <p className="text-white font-medium">
                                  {item.product_detail.name}
                                </p>
                                <p className="text-[#fce803] font-medium">
                                  x{item.quantity}
                                </p>
                                <span className="text-white font-medium">
                                  -
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <p className="text-white/85 text-sm">
                            Metodo De Pago:
                          </p>
                          <p className="text-white font-medium">
                            {selectedOrder[0].payment_method} - AR
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p className="text-white/85 text-sm">Total:</p>
                          <p className="text-white font-medium">
                            ${selectedOrder[0].total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={() => handleBack()}
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
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoldsAdmin;
