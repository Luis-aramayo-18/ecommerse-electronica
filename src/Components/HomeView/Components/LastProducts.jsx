import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

const LastProducts = ({ StyledSlider, settings, api }) => {
  const [lastProducts, setLastProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);

  const homeView = true;

  useEffect(() => {
    const fetchLastProducts = async () => {
      try {
        const response = await api.get("/products/?sort=latest");

        if (response.status === 200) {
          setLastProducts(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/recent-categories/");

        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {}
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
    <section className="shadow-[0_4px_10px_0_#6B7280] mx-3 rounded-2xl px-4 py-10 sm:mx-6 md:mx-14 lg:mx-24 bg-black/70 backdrop-blur">
      {lastProducts && categories ? (
        <>
          <div className="flex flex-col items-start  text-2xl font-semibold text-[#f0f7fe] mb-2 ms-3 sm:ms-5">
            <h2 className="text-center uppercase tracking-widest">
              Últimos Agregados
            </h2>
          </div>

          {/* ---------PRODUCTS--------- */}
          <div className="flex gap-3 mb-6 ms-3 sm:ms-5 relative">
            <button
              className="flex items-center text-lg font-semibold text-[#deecfb] ms-2 group"
              onClick={() => setMenu(!menu)}
            >
              <p>ver</p>
              <i
                className={`bx bxs-right-arrow-alt mt-1 transition-transform ${
                  menu ? "translate-x-1" : "group-hover:translate-x-1"
                }`}
              ></i>
            </button>

            <nav className="relative w-full h-auto overflow-x-auto pb-3">
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
                    className="whitespace-nowrap transition-all duration-150 hover:text-[#fea401]"
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
            </nav>
          </div>

          <div>
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
          </div>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default LastProducts;
