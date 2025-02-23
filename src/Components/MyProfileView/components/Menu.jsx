import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Menu = ({ section, setSection, logoutUsername }) => {
  const [admin, setAdmin] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const adm = localStorage.getItem("userAdmin");
    if (adm === "true") {
      setAdmin(true); 
    }

    const sectionUrl = searchParams.get("section");
    if (sectionUrl) {
      setSection(sectionUrl);
    }
  }, []);

  useEffect(() => {
    setSearchParams({ section });
  }, [section]);

  return (
    <ul className="flex flex-col gap-5 text-base font-medium text-gray-500">
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-white hover:border-s-2 hover:border-white p-2 ${
          section === "information" ? "text-white border-s-2 border-white" : ""
        }`}
        onClick={() => setSection("information")}
      >
        <button>Información</button>
      </li>
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-white hover:border-s-2 hover:border-white p-2 ${
          section === "orders" ? "text-white border-s-2 border-white" : ""
        }`}
        onClick={() => setSection("orders")}
      >
        <button>Compras</button>
      </li>
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-white hover:border-s-2 hover:border-white p-2 ${
          section === "authentication"
            ? "text-white border-s-2 border-white"
            : ""
        }`}
        onClick={() => setSection("authentication")}
      >
        <button>Autenticación</button>
      </li>
      {admin === true && (
        <li
          className={`cursor-pointer transition-all duration-100 hover:text-white hover:border-s-2 p-2 hover:border-white ${
            section === "admin" ? "text-white border-s-2 border-white" : ""
          }`}
          onClick={() => setSection("admin")}
        >
          <button>Admin</button>
        </li>
      )}
      <li>
        <button onClick={logoutUsername}>Salir</button>
      </li>
    </ul>
  );
};

export default Menu;
