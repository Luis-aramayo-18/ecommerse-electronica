import React, { useEffect, useState } from "react";
import ProductCard from "../../ListProductsView/Components/ProductCard";

const ProductsOnSale = ({ StyledSlider, settings, api }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.get("/products/");

        const productsFiltered = products.data.results.filter(
          (product) => product.is_on_sale === true
        );

        setProducts(productsFiltered);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="px-6 sm:x-6 md:px-14 lg:px-24 xl:px-24 2xl:px-24 py-6 lg:py-8 bg-violet-600">
      <div className="flex items-end lg:gap-2 text-2xl font-semibold text-white cursor-pointer mb-5">
        <h2 className="text-center uppercase tracking-widest">Ofertas</h2>
        <i className="bx bxs-right-arrow-alt"></i>
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
