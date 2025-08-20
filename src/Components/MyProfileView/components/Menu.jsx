
const Menu = ({ section, setSection, logoutUsername, setSearchParams }) => {

  const handleSectionChange = (newSection) => {
    setSearchParams({ section: newSection });
    setSection(newSection);
  };

  return (
    <ul className="flex flex-col gap-5 text-base font-medium text-black/65">
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "information" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => handleSectionChange("information")}
      >
        <button>Mis datos</button>
      </li>

      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "orders" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => handleSectionChange("orders")}
      >
        <button>Mis Compras</button>
      </li>

      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "directions" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => handleSectionChange("directions")}
      >
        <button>Mis direcciones</button>
      </li>

      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "authentication"
            ? "text-black border-s-2 border-black"
            : ""
        }`}
        onClick={() => handleSectionChange("authentication")}
      >
        <button>Autenticación</button>
      </li>

      <li className="p-2 transition-all duration-100 hover:text-black">
        <button onClick={logoutUsername}>Salir</button>
      </li>
    </ul>
  );
};

export default Menu;
