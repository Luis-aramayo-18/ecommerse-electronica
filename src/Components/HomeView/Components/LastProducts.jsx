import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";

const LastProducts = ({ StyledSlider, settings, api }) => {
  const [lastProducts, setLastProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);

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
        const response = await api.get("/categories/");
        
        if (response.status === 200) {
          setCategories(response.data)
        }
      } catch (error) {}
    };
    fetchLastProducts();
    fetchCategories();
  }, []);

  return (
    <section className="px-6 sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-4 lg:py-10 bg-[#334155] overflow-hidden">
      <div className="flex flex-col items-start  text-2xl font-semibold text-[#f0f7fe] mb-2">
        <h2 className="text-center uppercase tracking-widest">
          Últimos Agregados
        </h2>
      </div>

      <div className="flex gap-3 mb-6 relative">
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

        {categories && (
          <nav className="relative w-full h-auto overflow-x-auto pb-3">
            <ul
              className={`h-full flex items-center gap-3 transform transition-all duration-300 absolute left-0 text-sm font-medium text-[#deecfb] ${
                menu
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              {categories.map((category) => (
                <li key={category.id} className="whitespace-nowrap transition-all duration-150 hover:text-[#fea401]">
                  <Link
                    to={`/products/category/${category.id}?sort=latest`}
                    className=""
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="my-4">
        <StyledSlider {...settings}>
          {lastProducts.map((product, idx) => (
            <div className="!w-auto relative" key={product.id || idx}>
              <ProductCard product={product} />
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

      <div className="flex flex-col lg:flex-row gap-3 mt-10">
        <img
          src="/img/home/banner-gamer-1.webp"
          className="w-[100%] lg:w-[19%]"
          alt=""
        />
        <img
          src="/img/home/banner-gamer-2.webp"
          className="w-[100%] lg:w-3/5"
          alt=""
        />
        <img
          src="/img/home/banner-gamer-3.webp"
          className="w-[100%] lg:w-[19%]"
          alt=""
        />
      </div>
    </section>
  );
};

export default LastProducts;
