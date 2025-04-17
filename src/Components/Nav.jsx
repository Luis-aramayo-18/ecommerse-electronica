import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";
import { useAxios } from "./Hooks/useAxios";
import { debounce } from "lodash";
import axios from "axios";
import Cart from "./PaymentView/Cart";
import Loading from "./Loading";

const Nav = () => {
  const { setUserData, userData } = useAuth();

  const [searchProduct, setSearchProduct] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState(false);

  const [myAccountMenu, setMyAccountMenu] = useState(false);
  const [suggestions, setSuggestions] = useState({
    categories: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [brand, setBrand] = useState("");

  const api = useAxios();

  const categoryIdFromUrl = location.pathname.split("/")[3];

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProduct]);

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

  const deleteSuggestions = () => {
    setSearchProduct("");
    setSuggestions({
      products: [],
      categories: [],
    });
  };

  return (
    <>
      <section className="border-b border-white/35 bg-black/65 z-50 px-3 md:px-14 lg:px-24 h-[8vh] md:h-[10vh] sticky w-full top-0">
        <nav className="flex items-center justify-center h-full gap-4 relative">
          {/* ---- BURGER MENU ICON----- */}
          <button className="absolute left-0 text-white" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <div
            className={`fixed inset-0 z-20 transition-all duration-300 ${
              openMenu
                ? "bg-black/75 backdrop-blur-sm"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMenu}
          >
            <div
              className={`border-r border-white/25 flex flex-col items-start fixed left-0 top-0 z-50 p-8 backdrop-blur-lg w-5/6 sm:w-3/6 md:w-[40%] lg:w-[25%] h-screen transform transition-transform duration-300 ${
                openMenu ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col gap-4 w-full">
                <Link to="/" className="w-32" onClick={toggleMenu}>
                  <div className="w-24">
                    <img
                      className="w-full object-cover"
                      src="/img/logonav.png"
                      alt=""
                    />
                  </div>
                </Link>

                <div
                  className="mt-16 cursor-pointer"
                  onClick={() => setCategoryMenu(!categoryMenu)}
                >
                  <div className="flex justify-between items-center m-0 text-xl font-medium text-white">
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
                        className={`block transition-all mt-1 font-semibold duration-100 hover:text-[#fce803]
                          ${
                            category.id === parseInt(categoryIdFromUrl)
                              ? "text-[#fce803]"
                              : "text-white/65"
                          }`}
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
                <hr className="relative z-50 lg:hidden" />
              </div>

              <div
                className="flex items-center gap-1 mt-5 w-full md:hidden"
                onClick={() => setMyAccountMenu(!myAccountMenu)}
              >
                {userData.token ? (
                  <Link
                    className="flex justify-between items-center m-0 text-xl font-medium"
                    to="/myAccount?section=information"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="object-cover w-12 h-12 rounded-full border border-white"
                        alt={`imagen de perfil de ${userData.username}`}
                        src={
                          userData.image ? userData.image : `/img/home/user.png`
                        }
                      />
                      <p className="first-letter:uppercase text-white">
                        {userData.username && `${userData.username}`}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    className="flex items-end gap-2 text-white"
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-[#f0f7fe]">Ingresar</p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 relative w-4/6 md:w-2/4 lg:w-[40%] h-full">
            <div className="flex flex-col w-full ">
              <div className="relative flex items-center group focus-within">
                <input
                  placeholder="Buscar..."
                  type="text"
                  className="w-full p-2 px-4 placeholder-white focus:outline-none text-white text-sm font-bold rounded-full bg-black/75 focus:bg-[#fce803] focus:placeholder:text-black focus:text-black backdrop-blur-lg border border-white/25"
                  value={searchProduct}
                  onChange={handleSearchProduct}
                />
                {loading ? (
                  <Loading className="absolute right-4" />
                ) : suggestions.products.length > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 absolute right-4 cursor-pointer z-10 text-white group-focus-within:text-black"
                    onClick={deleteSuggestions}
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 absolute right-4 z-10 text-white group-focus-within:text-black transition-colors"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            {suggestions.products.length > 0 ||
            suggestions.categories.length > 0 ? (
              <div className="absolute mt-2 left-0 top-full m-auto w-full bg-black/70 border border-gray-500 backdrop-blur-sm rounded-2xl p-2 max-h-[380px] overflow-y-auto">
                <ul className="text-sm text-gray-300">
                  {suggestions.products.map((product) => (
                    <li
                      key={product.id}
                      className="mt-3 transition-all duration-150 lg:hover:bg-[#fea401] lg:hover:text-white rounded-2xl"
                    >
                      <Link
                        className="flex gap-2 items-center px-2 md:px-4"
                        to={`/products/category/${product.category_detail.id}/product/${product.id}`}
                        onClick={handleSelectSuggestion}
                      >
                        <div className="w-16 h-16 overflow-hidden">
                          <img
                            src={`${product.images[0]?.image}`}
                            alt={`imagen de ${product.name}`}
                            className="object-contain w-full h-full bg-white"
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

                <ul className="text-sm mt-5 mb-3 text-gray-300">
                  {suggestions.categories.map((category) => (
                    <li
                      key={category.id}
                      className="mt-2 px-2 md:px-4 first-letter:uppercase"
                    >
                      <Link
                        to={`/products/category/${category.id}?brand=${brand}`}
                        onClick={handleSelectSuggestion}
                        className="transition-all duration-150 lg:hover:text-[#fea401] "
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
                <Link
                  className="flex items-center border border-white w-10 h-10 rounded-full overflow-hidden"
                  to="/myAccount?section=information"
                >
                  <img
                    className="object-cover w-full h-full"
                    alt={`imagen de perfil de ${userData.username}`}
                    src={userData.image ? userData.image : `/img/home/user.png`}
                  />
                </Link>
              ) : (
                <Link className="flex items-end text-white" to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
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
