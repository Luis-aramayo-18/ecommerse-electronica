import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAxios } from "../Hooks/useAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import BreadCrumb from "./Components/BreadCrumb";
import ProductItem from "./Components/ProductItem";
import BoxComments from "./Components/BoxComments";
import RelatedProducts from "./Components/RelatedProducts";

const Product = () => {
  const api = useAxios();
  const userID = localStorage.getItem("userId");

  const [product, setProduct] = useState();
  const [comments, setComments] = useState([]);

  const { productId, categoryId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);

          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (product) {
      const getCommentsProduct = async () => {
        try {
          const response = await api.get(
            `/comments/get_comments?product=${product.id}`
          );

          const sortedComments = response.data.sort((a, b) => {
            return a.user === userID ? -1 : 1;
          });
          setComments(sortedComments);
        } catch (error) {
          console.log(error);
        }
      };

      getCommentsProduct();
    }
  }, [product, api, userID]);

  // useEffect(() => {
  //   const productName = product.name;
  //   const productCategory = product.category_detail.name;

  //   const searchProduct = async () => {
  //     try {
  //       const response = await axios.post(
  //         `https://api.techspecs.io/v4/product/search?query=${productName}&keepCasing=true`,
  //         { category: productCategory }, // Provide category in the body
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19RdUcxMXhDZTJla2QxVCIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTcyNzE1NjQ4NH0.l4MDMk2Fj0tb18DdwNiBSOCWRtPKvhYhEKNIjQ1OOpU", // Replace with your actual API key
  //           },
  //         }
  //       );
  //       console.log(response.data); // Output the response data
  //     } catch (error) {
  //       if (error.response) {
  //         console.log("Error Response:", error.response.data);
  //         console.log("Status Code:", error.response.status);
  //       } else if (error.request) {
  //         console.log("Error Request:", error.request);
  //       } else {
  //         console.log("Error", error.message);
  //       }
  //     }
  //   };

  //   searchProduct();
  // }, [product]);

  return (
    <>
      <div className="mt-10 w-full h-auto px-6 md:px-14 lg:px-24">
        <div className="lg:mx-10">
          {/* ---- BREADCRUMB ----- */}
          <BreadCrumb product={product} categoryId={categoryId} />

          {/* ---- PRODUCT ----- */}
          <ProductItem product={product} comments={comments} />

          {/* ---- COMMENTS ----- */}
          <BoxComments
            comments={comments}
            setComments={setComments}
            product={product}
            userID={userID}
            api={api}
            categoryId={categoryId}
          />

          {/* ---- PRODUCTS RELATED ----- */}
          <RelatedProducts product={product} api={api} />
        </div>
      </div>
    </>
  );
};

export default Product;
