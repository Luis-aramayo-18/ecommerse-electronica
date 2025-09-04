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
import Loading from "../Loading";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);  

  return (
    <>
      <div className="mt-10 w-full h-auto px-3 md:px-14 lg:px-24">
        {product && comments ? (
          <div className="lg:mx-10 mx-0">
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
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Product;
