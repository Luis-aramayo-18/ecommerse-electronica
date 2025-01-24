import React from "react";
import { useNavigate } from "react-router-dom";

const GamerBanner = () => {
  const navigate = useNavigate();

  const navigateGamerProduct = () => {
    const category = 19
    navigate(`/products/category/${category}`)
  };

  return (
    <section className="cursor-pointer" onClick={() => navigateGamerProduct()}>
      <img src="/img/home/banner-gamer.webp" alt="" />
    </section>
  );
};

export default GamerBanner;
