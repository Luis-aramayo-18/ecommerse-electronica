import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";
import { useAxios } from "./Hooks/useAxios";
import { debounce } from "lodash";
import axios from "axios";
import Cart from "./PaymentView/Cart";
import Loading from "./Loading";

const Nav = () => {
  const { setUserData, userData, logoutUsername } = useAuth();

  const [searchProduct, setSearchProduct] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const [myAccountMenu, setMyAccountMenu] = useState(false);
  const [suggestions, setSuggestions] = useState({
    categories: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState("");
  const cache = new Map();
  const api = useAxios();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const img = localStorage.getItem("profileImage");

    setUserData((prevUserData) => ({
      ...prevUserData,
      image: img,
    }));

    const getCategories = async () => {
      try {
        const response = await api.get("/categories/");

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const fetchSuggestions = async (searchProduct) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/products/search/?search=${searchProduct}`
      );

      if (response.status === 200) {
        setBrand(response.data.products[0].brand_detail.name);

        setSuggestions({
          categories: response.data.categories,
          products: response.data.products,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error fetching suggestions:", error);
      }
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const handleSearchProduct = (e) => {
    const query = e.target.value;
    setSearchProduct(query);
  };

  const debouncedFetch = debounce(fetchSuggestions, 1000);

  useEffect(() => {
    if (searchProduct.trim() !== "") {
      debouncedFetch(searchProduct);
    } else {
      setSuggestions({ categories: [], products: [] });
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchProduct]);

  const handlerLogout = () => {
    logoutUsername();
  };

  const handleSelectSuggestion = () => {
    setSearchProduct("");
    setSuggestions({
      products: [],
      categories: [],
    });
  };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);

  return (
    <>
      <section className="border-b-2 bg-[#2a4fa3]/80 z-10 px-3 md:px-14 lg:px-24 h-[8vh] md:h-[10vh] sticky w-full top-0">
        <nav className="flex items-center justify-center h-full gap-4 relative">
          {/* ---- BURGER MENU ICON----- */}
          <button className="absolute left-0 text-white" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <div
            className={`fixed inset-0 z-20 transition-all duration-300 ${
              openMenu
                ? "bg-black/50 backdrop-blur-sm"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMenu}
          >
            <div
              className={`border-r-2 flex flex-col items-start fixed left-0 top-0 z-50 p-8 backdrop-blur-lg bg-[#0f172a] w-5/6 sm:w-3/6 md:w-[40%] lg:w-[25%] h-screen transform transition-transform duration-300 ${
                openMenu ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col gap-4 w-full">
                <Link to="/" onClick={toggleMenu}>
                  <div className="w-16">
                    <img
                      className="w-full object-cover"
                      src="/img/logonav.png"
                      alt=""
                    />
                  </div>
                </Link>
                <div className="absolute right-0 cursor-pointer text-white">
                  <i className="bx bx-x text-2xl" onClick={toggleMenu}></i>
                </div>
                <div
                  className="mt-16 cursor-pointer"
                  onClick={() => setCategoryMenu(!categoryMenu)}
                >
                  <div className="flex justify-between items-center m-0 text-xl font-medium text-[#f0f7fe]">
                    <h2 className="">Productos</h2>

                    <i
                      className={`bx bxs-chevron-right text-3xl transition-all duration-300 ${
                        categoryMenu ? "rotate-90" : ""
                      }`}
                    ></i>
                  </div>
                  <div
                    className={`ms-2 max-h-0 overflow-hidden transition-all duration-300 ${
                      categoryMenu ? "max-h-80" : ""
                    }`}
                  >
                    {categories.map((category, idx) => (
                      <Link
                        onClick={toggleMenu}
                        to={`/products/category/${category.id}`}
                        key={category.id || idx}
                        className="block transition-all duration-100 hover:text-[#fea401] text-[#deecfb]"
                      >
                        <p>{category.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link to="/about" onClick={toggleMenu}>
                  <div className="flex justify-between items-center m-0 text-xl font-medium text-[#f0f7fe]">
                    <p>¿Quienes somos?</p>
                    <i className="bx bxs-chevron-right text-3xl"></i>
                  </div>
                </Link>
                <Link to="/contact" onClick={toggleMenu}>
                  <div className="flex justify-between items-center m-0 text-xl font-medium text-[#f0f7fe]">
                    <p>Contacto</p>
                    <i className="bx bxs-chevron-right text-3xl"></i>
                  </div>
                </Link>
                <hr className="relative z-50" />
              </div>

              <div
                className="flex items-center gap-1 mt-5 w-full md:hidden"
                onClick={() => setMyAccountMenu(!myAccountMenu)}
              >
                {userData.token ? (
                  <div className="w-full">
                    <div className="flex justify-between items-center m-0 text-xl font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          className="object-cover w-12 h-12 rounded-full border border-white"
                          alt={`imagen de perfil de ${userData.username}`}
                          src={
                            userData.image
                              ? userData.image
                              : `/img/home/user.png`
                          }
                        />
                        <p className="first-letter:uppercase">
                          {userData.username && `${userData.username}`}
                        </p>
                      </div>
                      <i
                        className={`bx bxs-chevron-right text-3xl transition-all duration-300 ${
                          myAccountMenu ? "rotate-90" : ""
                        }`}
                      ></i>
                    </div>
                    <div
                      className={`ms-2 max-h-0 overflow-hidden transition-all duration-300 mt-5 ${
                        myAccountMenu ? "max-h-80" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <Link to="/myAccount">Mi Información</Link>
                        <Link to="/myAccount">Mis Compras</Link>
                        {userData.userAdmin === true && (
                          <Link to="/formProduct">Cargar Producto</Link>
                        )}
                        <button className="text-left" onClick={logoutUsername}>
                          Salir
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link className="flex items-center gap-1 text-white" to="/login">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-7"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 relative w-4/6 md:w-2/4 lg:w-[40%] h-full">
            <div className="flex flex-col w-full ">
              <div className="relative flex items-center">
                <input
                  placeholder="Buscar..."
                  type="text"
                  className="w-full p-2 px-4 text-black rounded-full"
                  value={searchProduct}
                  onChange={handleSearchProduct}
                />
                <i className="bx bx-search text-black absolute right-2 text-xl"></i>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : suggestions.products.length > 0 ||
              suggestions.categories.length > 0 ? (
              <div className="absolute left-0 top-full m-auto w-full bg-gray-400 p-2">
                <ul className="text-sm">
                  {suggestions.products.map((product) => (
                    <li key={product.id} className="mt-3">
                      <Link
                        className="flex gap-2"
                        to={`/products/category/${product.category_detail.id}/product/${product.id}`}
                        onClick={handleSelectSuggestion}
                      >
                        <div className="w-16 h-16 overflow-hidden">
                          <img
                            src={`http://localhost:8000${product.images[0]?.image}`}
                            alt={`imagen de ${product.name}`}
                            className="object-contain w-full h-full"
                          />
                        </div>

                        <div>
                          <h2>{product.name}</h2>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <hr className="w-[80%] mt-5" />

                <ul className="text-sm mt-5 mb-3">
                  {suggestions.categories.map((category) => (
                    <li key={category.id} className="mt-1">
                      <Link
                        to={`/products/category/${category.id}?brand=${brand}`}
                        onClick={handleSelectSuggestion}
                      >
                        {category.name} {searchProduct}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="flex items-center sm:gap-1 md:gap-1 lg:gap-2 absolute top-0 right-0 h-full w-auto">
            <Cart />
            <div className="hidden md:relative md:flex md:items-center md:w-full md:h-full">
              {userData.token ? (
                <div>
                  <button
                    className="flex items-center border border-white w-10 h-10 rounded-full overflow-hidden"
                    onClick={() => setMenuUser(!menuUser)}
                  >
                    <img
                      className="object-cover w-full h-full"
                      alt={`imagen de perfil de ${userData.username}`}
                      src={
                        userData.image ? userData.image : `/img/home/user.png`
                      }
                    />
                  </button>

                  <div
                    className={`border border-white flex flex-col gap-3 text-lg mt-5 me-3 font-medium absolute right-0 w-44 bg-violet-400 p-5 transition-all duration-300 opacity-0 ${
                      menuUser ? "block opacity-100" : "hidden"
                    }`}
                  >
                    <span className="block w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-transparent border-b-violet-400 absolute -top-3 right-0"></span>
                    <Link
                      to="/MyAccount"
                      className="transition-all duration-150 text-gray-600 hover:text-white"
                    >
                      Mi información
                    </Link>
                    <Link
                      to="/MyAccount"
                      className="transition-all duration-150 text-gray-600 hover:text-white"
                    >
                      Mis Compras
                    </Link>
                    {userData.userAdmin === true && (
                      <Link
                        className="transition-all duration-150 text-gray-600 hover:text-white"
                        to="/formProduct"
                      >
                        Admin
                      </Link>
                    )}
                    <div
                      to="/MyAccount"
                      className="transition-all duration-150 text-gray-600 hover:text-red-600 cursor-pointer"
                      onClick={handlerLogout}
                    >
                      Salir
                    </div>
                  </div>
                </div>
              ) : (
                <Link className="flex items-end text-white" to="/Login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-7"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Nav;
