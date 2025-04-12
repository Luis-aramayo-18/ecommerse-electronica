import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import ProductCard from "../../ListProductsView/Components/ProductCard";
import Loading from "../../Loading";

const StyledSlider = styled(Slider)`
  .slick-list {
  }
  ,
  .slick-track {
    display: flex !important;
  }
  ,
  .slick-slide {
    margin: 0 10px;
  }
`;

const RelatedProducts = ({ product, api }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");

  const homeView = true;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      Math.min(relatedProducts.length) <= 4
        ? Math.min(relatedProducts.length)
        : 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow:
            Math.min(relatedProducts.length) <= 3
              ? Math.min(relatedProducts.length)
              : 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          dots: true,
          slidesToShow:
            Math.min(relatedProducts.length) <= 2
              ? Math.min(relatedProducts.length)
              : 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (product) {
      const getRelateProduct = async () => {
        const productId = product.id;
        try {
          const allProduct = await api.get(
            `/products/${productId}/related-products`
          );
          if (allProduct.status === 200) {
            const related = allProduct.data;
            setRelatedProducts(related);
          }
        } catch (error) {
          if (error) {
            setError(error.response.data.detail);
          }
        }
      };

      getRelateProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <section>
      <div className="mt-10 lg:mt-20 py-8 px-4 lg:py-10 bg-black/70 backdrop-blur shadow-[0_4px_10px_0_#6B7280] rounded-2xl">
        <div>
          <h2 className="text-lg font-bold text-[#f0f7fe]">
            También podría Interesarte
          </h2>
        </div>

        <div className="mt-8 w-full">
          {error ? (
            <p className="font-medium">{error}</p>
          ) : relatedProducts && relatedProducts.length > 0 ? (
            <StyledSlider {...settings} className="">
              {relatedProducts.map((product, idx) => (
                <ProductCard
                  key={product.id || idx}
                  product={product}
                  homeView={homeView}
                />
              ))}
            </StyledSlider>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
