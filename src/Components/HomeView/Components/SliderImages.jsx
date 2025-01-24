import React from "react";
import Slider from "react-slick";

const SliderImages = () => {
  const settingsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <section className="h-auto lg:h-[90vh] overflow-hidden">
      <Slider {...settingsSlider} className="w-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src="https://saulromanjimenez.com/wp-content/uploads/2023/01/imagen-publicitaria.png"
            className="w-full h-full object-cover"
            alt="..."
          />
        </div>
        <div className="w-full h-full overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/18/03/4d/18034d4975a8f04ace121431cedecf1e.jpg"
            className="w-full h-full object-cover"
            alt="..."
          />
        </div>
        <div className="w-full h-full overflow-hidden">
          <img
            src="https://cdn.escala.com/wp-content/uploads/2022/07/definicion-campana-publicitaria-de-un-producto-escala.png"
            className="w-full h-full object-cover"
            alt="..."
          />
        </div>
      </Slider>
    </section>
  );
};

export default SliderImages;
