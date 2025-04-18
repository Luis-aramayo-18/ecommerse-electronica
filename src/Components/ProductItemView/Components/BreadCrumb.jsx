import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ loading, product }) => {
  return (
    <section>
   
        <nav>
          <ol className="flex items-center gap-1 mb-10 text-white/65">
            <li className="cursor-pointer font-medium text-sm hover:text-white">
              <Link to="/">Home</Link>
            </li>

            <i className="bx bx-chevron-right"></i>

            <li className="cursor-pointer text-light font-medium text-sm hover:text-white">
              <Link to={`/products/category/${product.category}`}>
                {product.category_detail.name}
              </Link>
            </li>

            <i className="bx bx-chevron-right"></i>

            <li className="cursor-pointer text-light font-medium text-sm hover:text-white">
              <Link
                to={`/products/category/${product.category}?brand=${product.brand_detail.name}`}
              >
                {product.brand_detail.name}
              </Link>
            </li>

            <i className="bx bx-chevron-right"></i>

            <li className=" text-light font-medium text-sm">{product.name}</li>
          </ol>
        </nav>

    </section>
  );
};

export default BreadCrumb;
