import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";

const LastProducts = ({ StyledSlider, settings, api }) => {
  const [lastProducts, setLastProducts] = useState([]);

  useEffect(() => {
    const fetchLastProducts = async () => {
      const category = 9;
      const latest = true;
      try {
        const response = await api.get(
          `/products/?category=${category}&last_products=${latest}`
        );
        
        setLastProducts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLastProducts();
  }, []);

  return (
    <section className="px-6 sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-4 lg:py-10 bg-violet-600 overflow-hidden">
      <div className="flex items-end lg:gap-2 text-2xl font-semibold text-white cursor-pointer mb-5">
        <h2 className="text-center uppercase tracking-widest">
          Últimos Productos agregados
        </h2>
        <i className="bx bxs-right-arrow-alt"></i>
      </div>

      <div className="my-4">
        <StyledSlider {...settings}>
          {lastProducts.map((product, idx) => (
            <div className="relative" key={product.id || idx}>
              <ProductCard product={product} />
              <div className="h-20 w-20 flex items-center justify-center absolute top-0 right-0 border-t border-e">
                <img
                  src="/img/home/new.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </StyledSlider>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mt-10">
        <img
          src="/img/home/banner-gamer-1.webp"
          className="w-[100%] lg:w-[19%]"
          alt=""
        />
        <img
          src="/img/home/banner-gamer-2.webp"
          className="w-[100%] lg:w-3/5"
          alt=""
        />
        <img
          src="/img/home/banner-gamer-3.webp"
          className="w-[100%] lg:w-[19%]"
          alt=""
        />
      </div>
    </section>
  );
};

export default LastProducts;
