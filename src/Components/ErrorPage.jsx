import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-9xl font-bold mt-10">404 !</h1>
      <h2 className="text-3xl font-medium mt-5">Opps, pagina no encontrada.</h2>
      <p className="text-lg font-light mt-2">Parece que la pagina que buscas no existe.</p>

      <Link className="mt-10 text- font-semibold border rounded-2xl p-4" to="/">Volver al inicio</Link>
    </div>
  );
};

export default ErrorPage;
