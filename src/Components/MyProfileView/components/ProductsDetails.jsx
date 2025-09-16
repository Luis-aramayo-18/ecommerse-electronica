import React, { useState } from "react";
import Slider from "react-slick";
import NextArrowSlider from "../../NextArrowSlider";
import PrevArrowSlider from "../../PrevArrowSlider";
import ProductPay from "./ProductPay";
import ProductForm from "./ProductForm";

const ProductsDetails = ({ selectedOrder, formActive, setFormActive }) => {
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

  const [itemSelectedForReview, setItemSelectedForReview] = useState(null);

  return (
    <>
      <div className="mb-5 text-sm font-medium text-[#fce803]">
        <h2>Detalles De Los Productos.</h2>
      </div>

      <div className="relative h-[208px]">
        {/* -----PRODUCTS---- */}
        <div
          className={`transition-all duration-500 ease-in-out w-full absolute top-0 left-0 ${
            formActive.formProduct
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <Slider {...settings}>
            <ProductPay
              selectedOrder={selectedOrder}
              formActive={formActive}
              setFormActive={setFormActive}
              setItemSelectedForReview={setItemSelectedForReview}
            />
          </Slider>
        </div>

        {/* -----FORM---- */}
        <div
          className={`transition-all duration-500 ease-in-out w-full absolute top-0 left-0 ${
            formActive.formProduct
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <ProductForm
            formActive={formActive}
            setFormActive={setFormActive}
            itemSelectedForReview={itemSelectedForReview}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsDetails;
