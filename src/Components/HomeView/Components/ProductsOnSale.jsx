import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";
import { Link } from "react-router-dom";

const ProductsOnSale = ({ StyledSlider, settings, api }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");
  const [menu, setMenu] = useState(false);

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
  }, []);

  return (
    <section className="px-6 sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-6 lg:py-8 bg-[#334155]">
      <div className="flex flex-col items-start  text-2xl font-semibold text-[#f0f7fe] mb-2">
        <h2 className="text-center uppercase tracking-widest">Ofertas</h2>
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
          <nav className="relative w-full h-auto overflow-hidden">
            <ul
              className={`h-full flex items-center gap-3 transform transition-all duration-300 absolute left-0 text-sm font-medium text-[#deecfb] ${
                menu
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              {categories.map((category) => (
                <li key={category.id} className="transition-all duration-150 hover:text-[#fea401]">
                  <Link
                    to={`/products/category/${category.id}?sort=discount`}
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
        <StyledSlider {...settings}>
          {products.map((product, idx) => (
            <ProductCard key={product.id || idx} product={product} />
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default ProductsOnSale;
