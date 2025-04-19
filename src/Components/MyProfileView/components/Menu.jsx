import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Menu = ({ section, setSection, logoutUsername, admin, setAdmin }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ section });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return (
    <ul className="flex flex-col gap-5 text-base font-medium text-black/65">
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "information" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => setSection("information")}
      >
        <button>Información</button>
      </li>

      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "authentication"
            ? "text-black border-s-2 border-black"
            : ""
        }`}
        onClick={() => setSection("authentication")}
      >
        <button>Autenticación</button>
      </li>

      {admin === true ? (
        <li
          className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 p-2 hover:border-black ${
            section === "admin" ? "text-black border-s-2 border-black" : ""
          }`}
          onClick={() => setSection("admin")}
        >
          <button>Admin</button>
        </li>
      ) : (
        <li
          className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
            section === "orders" ? "text-black border-s-2 border-black" : ""
          }`}
          onClick={() => setSection("orders")}
        >
          <button>Compras</button>
        </li>
      )}
      
      <li className="p-2 transition-all duration-100 hover:text-black">
        <button onClick={logoutUsername}>Salir</button>
      </li>
    </ul>
  );
};

export default Menu;
