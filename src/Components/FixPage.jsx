import React from "react";
import { Link } from "react-router-dom";

const FixPage = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-6xl font-bold mt-10">Lo Sentimos !</h1>
      <h2 className="text-xl font-medium mt-3">
        Estamos trabajando en la pagina.
      </h2>

      <Link to="/" className="font-bold mt-10 border p-4 rounded-3xl">Volver al inicio</Link>
    </div>
  );
};

export default FixPage;
