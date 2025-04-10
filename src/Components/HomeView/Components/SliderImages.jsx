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
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="z-10 ">
      <Slider {...settingsSlider} className="w-full">
        <div className="h-full">
          <img
            src="/img/home/banner-home-3.webp"
            className="object-cover w-full h-[580px]"
            alt="..."
          />
        </div>
        <div className="h-full">
          <img
            src="/img/home/banner-home-2.webp"
            className="object-cover w-full h-[580px]"
            alt="..."
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <img
            src="/img/home/banner-home.webp"
            className="object-cover w-full h-[580px]"
            alt="..."
          />
        </div>
      </Slider>
    </section>
  );
};

export default SliderImages;
