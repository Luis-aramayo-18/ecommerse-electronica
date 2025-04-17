import React from "react";
import { useNavigate } from "react-router-dom";

const GamerBanner = () => {
  const navigate = useNavigate();

  const navigateGamerProduct = () => {
    const category = 3;
    navigate(`/products/category/${category}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="cursor-pointer mt-10"
      onClick={() => navigateGamerProduct()}
    >
      <img
        src="/img/home/banner-gamer.webp"
        alt=""
        className="border-b-2 object-cover w-full h-60 sm:h-auto"
      />
    </section>
  );
};

export default GamerBanner;
