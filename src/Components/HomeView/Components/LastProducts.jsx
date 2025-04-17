import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

const LastProducts = ({ StyledSlider, settings, api }) => {
  const [lastProducts, setLastProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
  });

  const homeView = true;

  useEffect(() => {
    const fetchLastProducts = async () => {
      setLoading((prev) => ({ ...prev, products: true }));
      try {
        const response = await api.get("/products/?sort=latest");

        if (response.status === 200) {
          setLastProducts(response.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    const fetchCategories = async () => {
      setLoading((prev) => ({ ...prev, categories: true }));
      try {
        const response = await api.get("/categories/recent-categories/");

        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    };
    fetchLastProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="glass-box mx-3 px-4 py-10 sm:mx-6 md:mx-14 lg:mx-24 mt-10">
      <div className="flex flex-col items-start  text-2xl font-semibold text-white mb-2 ms-3 sm:ms-5 z-10">
        <h2 className="text-center uppercase tracking-widest">
          Últimos Agregados
        </h2>
      </div>

      {/* ---------PRODUCTS--------- */}
      <div className="flex gap-3 mb-6 ms-3 sm:ms-5 relative z-10">
        <button
          className="flex items-center text-lg font-semibold text-white/65 ms-2 group"
          onClick={() => setMenu(!menu)}
        >
          <p>ver</p>
          <i
            className={`bx bxs-right-arrow-alt mt-1 transition-transform ${
              menu ? "translate-x-1" : "group-hover:translate-x-1"
            }`}
          ></i>
        </button>

        <nav className="relative w-full h-auto overflow-x-auto mt-1">
          {loading.categories === false && categories ? (
            <ul
              className={`h-full flex items-center gap-3 transform overflow-x-scroll transition-all duration-300 absolute left-0 text-sm font-medium text-[#deecfb] ${
                menu
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="whitespace-nowrap transition-all duration-150 hover:text-[#fce803]"
                >
                  <Link
                    to={`/products/category/${category.id}?sort=latest`}
                    onClick={handleScrollToTop}
                    className=""
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Loading />
          )}
        </nav>
      </div>

      <div className="z-10">
        {loading.products ? (
          <Loading />
        ) : (
          <StyledSlider {...settings}>
            {lastProducts.map((product, idx) => (
              <div className="w-full relative" key={product.id || idx}>
                <ProductCard product={product} homeView={homeView} />
                <div className="h-20 w-20 flex items-center justify-center absolute top-0 right-0">
                  <img
                    src="/img/home/new.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </StyledSlider>
        )}
      </div>

      <div className="yellow-glow absolute w-[33%] h-[50%] bottom-[-10%] right-[-10%] z-0"></div>
    </section>
  );
};

export default LastProducts;
