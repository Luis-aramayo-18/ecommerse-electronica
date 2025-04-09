import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-black/90 backdrop-blur-sm px-6 sm:px-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 flex flex-col justify-center mt-28 sm:py-12">
      <div>
        <Link to="/">
          <img
            src="/img/logonav.png"
            alt="logo digital wolrd"
            className="w-60"
          />
        </Link>
      </div>

      <div className="flex gap-16 ms-5 mt-14 relative">
        <div>
          <h2 className="font-semibold text-xl text-white">Ayuda</h2>
          <ul className="mt-5 text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Contacto
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Garantia de productos
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Termino de condiciones
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-white">Mi cuenta</h2>
          <ul className="mt-5 text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Mi perfil
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Mis pedidos
            </li>
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Seguridad
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-white">Digital World</h2>
          <ul className="mt-5 text-sm">
            <li className="transition-all duration-100 text-gray-400 hover:text-[#fea401] cursor-pointer">
              Sobre la empresa
            </li>
          </ul>
        </div>

        <div className="absolute right-0 top-0">
          <h2 className="text-white font-semibold">
            SIGUENOS EN NUESTRAS REDES.
          </h2>
          <div className="flex justify-center gap-5 mt-3 text-gray-400">
            <i className="text-3xl bx bxl-instagram cursor-pointer transition-all duration-100 hover:text-white"></i>
            <i className="text-3xl bx bxl-facebook-circle cursor-pointer transition-all duration-100 hover:text-white"></i>
            <i className="text-3xl bx bxl-tiktok cursor-pointer transition-all duration-100 hover:text-white"></i>
          </div>
        </div>
      </div>
      <div className="text-sm  font-light text-gray-600 mt-12 ms-5">
        <span>Copyright ©. Todos los derechos reservados.</span>
      </div>
    </section>
  );
};

export default Footer;
