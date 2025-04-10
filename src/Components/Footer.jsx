import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="relative bg-black/90 backdrop-blur-sm px-6 sm:px-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 flex flex-col justify-center mt-28 py-5 sm:py-10">
      <div>
        <Link to="/" onClick={handleScrollToTop}>
          <img
            src="/img/logonav.png"
            alt="logo digital wolrd"
            className="w-44"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-16 ms-5 mt-10 relative">
        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">
            Ayuda
          </h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/contact" onClick={handleScrollToTop}>
                Contacto
              </Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/warranty" onClick={handleScrollToTop}>
                Garantia de productos
              </Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/terms" onClick={handleScrollToTop}>
                Termino y condiciones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">
            Mi cuenta
          </h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link
                to="/myAccount?section=information"
                onClick={handleScrollToTop}
              >
                Mi perfil
              </Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/myAccount?section=orders" onClick={handleScrollToTop}>
                Mis pedidos
              </Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link
                to="/myAccount?section=authentication"
                onClick={handleScrollToTop}
              >
                Seguridad
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">
            Digital World
          </h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/about" onClick={handleScrollToTop}>
                Sobre la empresa
              </Link>
            </li>
          </ul>
        </div>

        <div className="sm:absolute sm:right-0 sm:top-0">
          <h2 className="text-[#fea401] font-semibold">
            SIGUENOS EN NUESTRAS REDES.
          </h2>
          <div className="flex sm:justify-center gap-5 mt-3 text-gray-400">
            <Link to="https://www.instagram.com/" target="_blank">
              <i className="text-3xl bx bxl-instagram cursor-pointer transition-all duration-100 hover:text-white"></i>
            </Link>
            <Link to="https://www.facebook.com/reel/1399918194704473" target="_blank">
              <i className="text-3xl bx bxl-facebook-circle cursor-pointer transition-all duration-100 hover:text-white"></i>
            </Link>
            <Link to="https://www.tiktok.com/" target="_blank">
              <i className="text-3xl bx bxl-tiktok cursor-pointer transition-all duration-100 hover:text-white"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-sm  font-light text-gray-500 mt-12 ms-5">
        <span>Copyright ©. Todos los derechos reservados.</span>
      </div>
    </section>
  );
};

export default Footer;
