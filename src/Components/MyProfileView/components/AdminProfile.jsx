import ProductsAdmin from "./adminComponents/ProductsAdmin";
import UsersAdmin from "./adminComponents/UsersAdmin";
import SoldsAdmin from "./adminComponents/SoldsAdmin";
import { useState } from "react";

const AdminProfile = () => {
  const [section, setSection] = useState("products");

  const openSection = (section) => {
    switch (section) {
      case "products":
        return <ProductsAdmin />;

      case "users":
        return <UsersAdmin />;

      case "solds":
        return <SoldsAdmin />;

      default:
        return <ProductsAdmin />;
    }
  };

  return (
    <div>
      <section className="lg:glass-box relative lg:px-4 lg:py-10">
        <nav>
          <ul className="flex gap-10 text-sm mt-5 font-semibold">
            <li
              onClick={() => setSection("products")}
              className={`cursor-pointer  transition-all duration-100 lg:hover:text-white ${
                section === "products" ? "text-white" : "text-white/65"
              }`}
            >
              Cargar producto
            </li>
            <li
              onClick={() => setSection("users")}
              className={`cursor-pointer transition-all duration-100 lg:hover:text-white ${
                section === "users" ? "text-white" : "text-white/65"
              }`}
            >
              Cargar Usuario
            </li>
            <li
              onClick={() => setSection("solds")}
              className={`cursor-pointer transition-all duration-100 lg:hover:text-white ${
                section === "solds" ? "text-white" : "text-white/65"
              }`}
            >
              Mis ventas
            </li>
          </ul>
        </nav>

        <section className="flex flex-col-reverse lg:flex-row">
          {openSection(section)}
        </section>

        <section className="yellow-glow absolute left-[70%] top-[20%] h-[70%] w-[50%]"></section>
      </section>
    </div>
  );
};

export default AdminProfile;
