const AdminMenu = ({
  section,
  setSection,
  setSearchParams,
  logoutUsername,
}) => {
  const handleSectionChange = (newSection) => {
    setSearchParams({ section: newSection });
    setSection(newSection);
  };

  return (
    <ul className="flex flex-col gap-5 text-base font-medium text-black/65">
      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 hover:border-black p-2 ${
          section === "solds" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => handleSectionChange("solds")}
      >
        <button>Ventas</button>
      </li>

      <li
        className={`cursor-pointer transition-all duration-100 hover:text-black hover:border-s-2 p-2 hover:border-black ${
          section === "admin" ? "text-black border-s-2 border-black" : ""
        }`}
        onClick={() => handleSectionChange("admin")}
      >
        <button>Admin</button>
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

export default AdminMenu;
