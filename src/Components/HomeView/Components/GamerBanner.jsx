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
      className="cursor-pointer mt-10 shadow-[0_6px_8px_-2px_#6B7280]"
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
