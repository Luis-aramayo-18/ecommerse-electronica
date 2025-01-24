import React from "react";

const Footer = () => {
  return (
    <section className="section-footer mt-20">
      {/* <div className="flex flex-col items-center">
          <div className="bg-blue-600 flex rounded-md p-3 px-3 m-10">
            <div className="offer flex items-center gap-4 px-4">
              <i className="bx bx-rocket"></i>
              <div>
                <p>Hola</p>
                <p>Mundo</p>
              </div>
            </div>

            <div className="offer flex items-center gap-4 px-4">
              <i className="bx bx-rocket"></i>
              <div>
                <p>Hola</p>
                <p>Mundo</p>
              </div>
            </div>

            <div className="offer flex items-center gap-4 px-4">
              <i className="bx bx-rocket"></i>
              <div>
                <p>Hola</p>
                <p>Mundo</p>
              </div>
            </div>

            <div className="offer flex items-center gap-4 px-4">
              <i className="bx bx-rocket"></i>
              <div>
                <p>Hola</p>
                <p>Mundo</p>
              </div>
            </div>
          </div>
        </div> */}

      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center border rounded-xl gap-5 p-5">
          <h2>COMO COMPRAR EN LA TIENDA ?</h2>
          <img
            className="w-36 h-36 object-cover"
            src="https://cdn-icons-png.flaticon.com/512/2649/2649150.png"
            alt=""
          />
        </div>

        <div>
          <h2>SIGUENOS EN NUESTRAS REDES</h2>
          <div className="flex justify-center gap-5 mt-3">
            <i className="text-4xl bx bxl-instagram"></i>
            <i className="text-4xl bx bxl-facebook-circle"></i>
            <i className="text-4xl bx bxl-tiktok"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
