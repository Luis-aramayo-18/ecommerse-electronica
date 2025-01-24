import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../Loading";

const BreadCrumb = ({ product, categoryId }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigateToCategory = () => {
    const category = product.category;
    navigate(`/products/category/${category}`);
  };

  const navigateToBrand = () => {
    console.log(product);

    const brand = product.brand_detail.name;
    const category = product.category;

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("brand", brand);

    navigate(
      `/products/category/${category}?${updatedSearchParams.toString()}`
    );
  };

  return (
    <section>
      {product ? (
        <nav>
          <ol className="flex items-center gap-1 mb-10 text-gray-600">
            <li className="cursor-pointer font-medium text-sm hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <i className="bx bx-chevron-right"></i>
            <li className="cursor-pointer text-light font-medium text-sm hover:text-white">
              <Link to={`/products/category/${product.category}`}>
                {product.category_detail?.name || "nada"}
              </Link>
            </li>
            <i className="bx bx-chevron-right"></i>
            <li className="cursor-pointer text-light font-medium text-sm hover:text-white">
              <Link
                to={`/products/category/${product.category}?brand=${product.brand_detail.name}`}
              >
                {product ? product.brand_detail.name : "nada"}
              </Link>
            </li>
            <i className="bx bx-chevron-right"></i>
            <li className=" text-light font-medium text-sm">
              {product ? product.name : "cargando"}
            </li>
          </ol>
        </nav>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default BreadCrumb;
