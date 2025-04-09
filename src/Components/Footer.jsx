import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="relative bg-black/90 backdrop-blur-sm px-6 sm:px-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 flex flex-col justify-center mt-28 py-5 sm:py-10">
      <div>
        <Link to="/">
          <img
            src="/img/logonav.png"
            alt="logo digital wolrd"
            className="w-44"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-16 ms-5 mt-10 relative">
        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">Ayuda</h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/contact">Contacto</Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link>Garantia de productos</Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link>Termino y condiciones</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">Mi cuenta</h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/myAccount?section=information">Mi perfil</Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/myAccount?section=orders">Mis pedidos</Link>
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/myAccount?section=authentication">Seguridad</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold sm:text-xl text-2xl text-[#9cccf4]">Digital World</h2>
          <ul className="mt-5 text-lg sm:text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              <Link to="/about">Sobre la empresa</Link>
            </li>
          </ul>
        </div>

        <div className="sm:absolute sm:right-0 sm:top-0">
          <h2 className="text-white font-semibold">
            SIGUENOS EN NUESTRAS REDES.
          </h2>
          <div className="flex sm:justify-center gap-5 mt-3 text-gray-400">
            <i className="text-3xl bx bxl-instagram cursor-pointer transition-all duration-100 hover:text-white"></i>
            <i className="text-3xl bx bxl-facebook-circle cursor-pointer transition-all duration-100 hover:text-white"></i>
            <i className="text-3xl bx bxl-tiktok cursor-pointer transition-all duration-100 hover:text-white"></i>
          </div>
        </div>
      </div>
      <div className="text-sm  font-light text-[#fea401] mt-12 ms-5">
        <span>Copyright ©. Todos los derechos reservados.</span>
      </div>
    </section>
  );
};

export default Footer;
