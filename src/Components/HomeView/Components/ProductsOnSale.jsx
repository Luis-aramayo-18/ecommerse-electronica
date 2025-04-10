import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";

const ProductsOnSale = ({ StyledSlider, settings, api }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);

  const homeView = true;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.get("/products/?sort=discount");

        setProducts(products.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await api.get("/categories/on-sale-categories/");

        if (categories.status === 200) {
          setCategories(categories.data);
        }
      } catch (error) {}
    };
    fetchProducts();
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
    <section className="mx-3 shadow-[0_4px_10px_0_#6B7280] rounded-2xl sm:mx-6 md:mx-14 mt-10 lg:mx-24 py-10 px-4 bg-black/70 backdrop-blur">
      <div className="flex flex-col items-start  text-2xl font-semibold text-[#f0f7fe] mb-2 ms-3 sm:ms-5">
        <h2 className="text-center uppercase tracking-widest">Ofertas</h2>
      </div>

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

        {categories && (
          <nav className="relative w-full h-auto overflow-hidden">
            <ul
              className={`h-full flex items-center overflow-x-scroll gap-3 transform transition-all duration-300 absolute left-0 text-sm font-medium text-[#deecfb] ${
                menu
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="transition-all duration-150 hover:text-[#fea401]"
                >
                  <Link
                    to={`/products/category/${category.id}?sort=discount`}
                    onClick={handleScrollToTop}
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

      <div>
        <StyledSlider {...settings} className="h-full">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id || idx}
              product={product}
              homeView={homeView}
            />
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default ProductsOnSale;
