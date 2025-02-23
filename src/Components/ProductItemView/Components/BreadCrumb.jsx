import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

const BreadCrumb = ({ product }) => {
  return (
    <section>
      {product ? (
        <nav>
          <ol className="flex items-center gap-1 mb-10 text-[#afb6be]">
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
