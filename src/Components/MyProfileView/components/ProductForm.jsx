import React, { useState } from "react";
import { useAxios } from "../../Hooks/useAxios";
import { Bounce, toast } from "react-toastify";
import Loading from "../../Loading";

const ProductForm = ({ itemSelectedForReview, formActive, setFormActive }) => {
  const api = useAxios();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageComment, setMessageComment] = useState(false);

  const handleProductReview = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const commentData = {
        rating: rating,
        comment_text: comment,
        product: itemSelectedForReview,
      };
      const response = await api.post("/comments/", commentData);

      if (response.status === 201) {
        setComment("");
        setRating(0);
        setMessageComment(true);

        setTimeout(() => {
          setMessageComment(false);
          setFormActive((prev) => ({
            ...prev,
            formProduct: false,
          }));
        }, 3000);
      }
    } catch (error) {
      const errorFields = error.response.data.non_field_errors;
      const errorLogin = error.response.data.message;
      if (error.response) {
        if (errorFields) {
          toast.error(`${errorFields}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          setComment(null);
          setRating(0);
        }
      }
      if (error.response.status === 401) {
        toast.error(`${errorLogin}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* -----FORM---- */}
      <form
        onSubmit={handleProductReview}
        className={`w-full ${messageComment ? "hidden" : "block"}`}
      >
        <div className="mb-4 flex items-center gap-2 w-[10%]">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-xl flex items-center justify-center ${
                star <= rating ? "text-[#fce803]" : "text-white/65"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            name=""
            id=""
            required
            placeholder="Dejanos tu opinion del producto !"
            className="text-white placeholder:text-sm rounded-2xl sm:w-[82%] px-4 pb-44 sm:pb-24 pt-4 resize-none bg-black/30 backdrop-blur-sm"
          ></textarea>

          <div className="flex flex-col lg:w-[14%]">
            <button
              type="button"
              onClick={() =>
                setFormActive((prev) => ({
                  ...prev,
                  formProduct: false,
                }))
              }
              className="btn-glass p-2 h-[10%] mt-3"
            >
              Volver
            </button>

            <button
              disabled={loading}
              type="submit"
              className="btn-glass p-2 h-[10%] mt-3"
            >
              {loading ? <Loading /> : <p>Enviar</p>}
            </button>
          </div>
        </div>
      </form>

      {/* -----MESSAGE CONFIRMATION---- */}
      {messageComment && (
        <div
          className={`${
            messageComment
              ? "flex justify-center items-center gap-2 h-[114px]"
              : "hidden"
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          <div className="font-semibold text-2xl text-white">
            <p>Comentario enviado exitosamente</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
