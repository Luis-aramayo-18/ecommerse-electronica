import React, { useState } from "react";
import ProductsDetails from "./ProductsDetails";
import InfoOrderDetails from "./InfoOrderDetails";
import HelpPurchaseDetails from "./HelpPurchaseDetails";
import Loading from "../../Loading";

const OrdersDetails = ({
  loadOrdersUser,
  selectedOrder,
  searchParams,
  setSearchParams,
  setOrderDetails,
}) => {
  const [formActive, setFormActive] = useState({
    formPage: false,
    formContact: false,
    formProduct: false,
  });

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

  return (
    <>
      <section>
        {selectedOrder ? (
          <div className="relative overflow-hidden">
            <ProductsDetails
              selectedOrder={selectedOrder}
              formActive={formActive}
              setFormActive={setFormActive}
            />

            <hr className="w-full my-8 m-0 bg-white/15 border-0 h-px" />

            <InfoOrderDetails
              selectedOrder={selectedOrder}
              setFormActive={setFormActive}
            />

            <hr className="w-full my-8 m-0 bg-white/15 border-0 h-px" />

            <HelpPurchaseDetails
              formActive={formActive}
              setFormActive={setFormActive}
            />

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
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default OrdersDetails;
