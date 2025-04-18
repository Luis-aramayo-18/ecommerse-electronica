import React from "react";
import { Link } from "react-router-dom";

const LaptopBanner = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 mt-10 mx-3 sm:mx-6 md:mx-14 lg:mx-24">
      <Link
        to="/products/category/2"
        className="w-[100%] lg:w-[19%] hidden lg:block glass-box"
        onClick={handleScrollToTop}
      >
        <img
          src="/img/home/banner-gamer-1.webp"
          alt="banner laptop"
          className="w-full h-full max-h-[480px] rounded-2xl"
        />
      </Link>

      <Link
        to="/products/category/2"
        className="w-[100%] lg:w-3/5 glass-box"
        onClick={handleScrollToTop}
      >
        <img
          src="/img/home/banner-gamer-2.webp"
          alt="banner laptop"
          className="w-full h-full  rounded-2xl"
        />
      </Link>
      
      <Link
        to="/products/category/2"
        className="w-[100%] lg:w-[19%] hidden lg:block glass-box"
        onClick={handleScrollToTop}
      >
        <img
          src="/img/home/banner-gamer-3.webp"
          alt="banner laptop"
          className="w-full h-full max-h-[480px] rounded-2xl"
        />
      </Link>
    </div>
  );
};

export default LaptopBanner;
