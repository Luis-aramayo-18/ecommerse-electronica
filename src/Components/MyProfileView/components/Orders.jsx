import React from "react";

const Orders = ({
  errorMessage,
  formatPrice,
  orders,
  orderDetails,
  searchParams,
  setSelectedOrder,
  setOrderDetails,
  setSearchParams,
}) => {
  const handleShowOrderDetails = (orderId) => {
    const order = orders.find((order) => order.id === orderId);

    setSelectedOrder(order);
    setOrderDetails(true);

    const currentParams = Object.fromEntries(searchParams.entries());

    setSearchParams({ ...currentParams, orderId: orderId });
  };

  return (
    <>
      {errorMessage.getOrder ? (
        <p className="text-sm font-medium text-white/85">
          {errorMessage.getOrder}
        </p>
      ) : (
        <div>
          {orders.map((order, idx) => (
            <div
              className="group rounded-2xl hover:bg-[#fce803] cursor-pointer px-4 py-6"
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
                {order.order_items[0]?.product_detail?.images[0] && (
                  <img
                    src={order.order_items[0].product_detail.images[0].image}
                    alt={order.order_items[0].product_detail.name}
                    className="h-24 w-24"
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
      )}
    </>
  );
};

export default Orders;
