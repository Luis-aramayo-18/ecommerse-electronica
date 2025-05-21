import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

const ProductsOnSale = ({ StyledSlider, settings, api }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    products: '',
    categories: '',
  });
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
  });

  const homeView = true;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading((prev) => ({ ...prev, products: true }));
      try {
        const products = await api.get("/products/?sort=discount");

        setProducts(products.data.results);
      } catch (error) {
       console.log(error.response.data);
       
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    console.log(errorMessage);

    const fetchCategories = async () => {
      setLoading((prev) => ({ ...prev, categories: true }));
      try {
        const categories = await api.get("/categories/on-sale-categories/");
        console.log(categories);

        if (categories.status === 200) {
          setCategories(categories.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
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
    <section className="glass-box relative mx-3 sm:mx-6 md:mx-14 mt-10 lg:mx-24 px-4 py-10">
      <div className="z-10">
        <div className="flex flex-col items-start  text-2xl font-semibold text-white mb-2 ms-3 sm:ms-5">
          <h2 className="text-center uppercase tracking-widest">Ofertas</h2>
        </div>

        <div className="flex gap-3 mb-6 ms-3 sm:ms-5 relative">
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
                className={`h-full mb-0 flex items-center gap-3 overflow-x-scroll transform transition-all duration-300 absolute left-0 text-sm font-medium text-white/65 ${
                  menu
                    ? " translate-x-0 opacity-100"
                    : " -translate-x-full opacity-0"
                }`}
              >
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="transition-all duration-150 hover:text-[#fce803]"
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
            ) : (
              <Loading />
            )}
          </nav>
        </div>

        <div>
          {loading.products ? (
            <Loading />
          ) : (
            <StyledSlider {...settings} className="h-full">
              {products.map((product, idx) => (
                <ProductCard
                  key={product.id || idx}
                  product={product}
                  homeView={homeView}
                />
              ))}
            </StyledSlider>
          )}
        </div>
      </div>
      <div className="yellow-glow w-[100%] h-[40%] absolute bottom-0 z-0"></div>
    </section>
  );
};

export default ProductsOnSale;
