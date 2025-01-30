import { useAxios } from "../Hooks/useAxios";

import { useAuth } from "../Hooks/useAuth";

import Slider from "react-slick";
import styled from "styled-components";

import "moment/locale/es";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImages from "./Components/SliderImages";
import ProductsOnSale from "./Components/ProductsOnSale";
import Brands from "./Components/Brands";
import LastProducts from "./Components/LastProducts";
import CommentsBox from "./Components/CommentsBox";
import GamerBanner from "./Components/GamerBanner";

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

const Home = () => {
  const api = useAxios();

  const { userData } = useAuth();
  const { userId } = userData;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {/* --------CARRUSEL------ */}
      <SliderImages />

      {/* --------OFERTAS------ */}
      <ProductsOnSale
        StyledSlider={StyledSlider}
        settings={settings}
        api={api}
      />

      {/* --------MARCAS------ */}
      <Brands />

      {/* --------ÚLTIMOS PRODUCTOS------ */}
      <LastProducts StyledSlider={StyledSlider} settings={settings} api={api} />

      {/* --------BANNER------ */}
      <GamerBanner />

      {/* --------COMENTARIOS------ */}
      <CommentsBox
        StyledSlider={StyledSlider}
        settings={settings}
        userId={userId}
        api={api}
      />
    </>
  );
};

export default Home;
