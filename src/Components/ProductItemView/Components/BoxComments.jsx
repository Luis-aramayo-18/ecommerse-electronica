import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";

const BoxComments = ({ comments, setComments, product, userID, api }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [errors, setErrors] = useState({});
  const [editingComment, setEditingComment] = useState(false);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-black"
            key={i}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 text-black/65"
            key={i}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        );
      }
    }
    return stars;
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentData = {
      rating: rating,
      comment_text: comment,
      product: product.id,
    };
    try {
      const response = await api.post("/comments/", commentData);
      console.log(response);

      if (response.status === 201) {
        toast.success(`${response.data.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setComment("");
        setRating(0);
        setErrors({});
        setComments((prevComments) => [...prevComments, response.data.data]);
      }
    } catch (error) {
      console.log(error);

      const errorFields = error.response.data.non_field_errors;
      const errorLogin = error.response.data.message;
      if (error.response) {
        setErrors(error.response.data);
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

          setComment("");
          setRating(0);
          setErrors({});
        }
      }
      if (error.response.status === 401) {
        setErrors(errorLogin);
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
    }
  };

  const handleEditComment = (data) => {
    setEditingComment(true);
    setRating(data.rating);
    setComment(data.comment_text);
    setCommentId(data.id);
  };

  const handleUpdateComment = async () => {
    const dataComment = {
      comment_text: comment,
      rating: rating,
      product: product.id,
    };
    try {
      const response = await api.put(`/comments/${commentId}/`, dataComment);

      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setComment("");
        setRating(0);
        setErrors({});
        setEditingComment(false);
        const newComment = comments.map((comment) =>
          comment.id === commentId ? { ...comment, ...dataComment } : comment
        );
        setComments(newComment);
      }
    } catch (error) {
      const errorFields = error.response.data.non_field_errors;
      const errorLogin = error.response.data.message;
      if (error.response) {
        setErrors(error.response.data);
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

          setComment("");
          setRating(0);
          setErrors({});
        }
      }
      if (error.response.status === 401) {
        setErrors(errorLogin);
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
    }
  };

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await api.delete(`/comments/${commentID}`);

      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        const newComments = comments.filter(
          (comment) => comment.id !== commentID
        );
        setComments(newComments);
        setComment("");
        setRating(0);
        setErrors({});
        setEditingComment(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-10">
      <div className="px-4 py-10 glass-box relative overflow-hidden">
        <div>
          <h2 className="text-lg font-bold uppercase text-white">
            Opiniones del Producto
          </h2>
        </div>

        {/* --------COMMENTS------ */}
        <div className="mt-10 max-h-52 overflow-y-auto px-4">
          {comments.map((comment) => (
            <div
              className="flex items-center gap-4 relative mb-8 bg-[#fce803] rounded-xl  backdrop-blur-lg p-5"
              key={comment.id}
            >
              <div className="border border-black/25 flex items-center justify-center rounded-full overflow-hidden">
                <img
                  src={
                    comment.user.image
                      ? `${comment.user.image}`
                      : `/img/home/user.png`
                  }
                  alt={`foto de perfil de ${comment.user.username}`}
                  className="w-20 h-20 object-cover"
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <h4 className="text-black font-semibold first-letter:uppercase">
                    {comment.user.username}
                  </h4>
                  <p className="text-black/65 text-xs font-light">
                    {new Date(comment.created_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>

                <div className="flex">{renderStars(comment.rating)}</div>

                <div>
                  <p className="text-black/65 lowercase first-letter:uppercase mt-1">
                    {comment.comment_text}
                  </p>
                </div>
              </div>

              {comment.user.id === parseFloat(userID) && (
                <div className=" gap-3 absolute right-1 top-1 hidden">
                  <div
                    className="cursor-pointer opacity-70 lg:hover:opacity-100 transition-all duration-150"
                    onClick={() => handleEditComment(comment)}
                  >
                    <i className="bx bxs-edit-alt text-lg text-white "></i>
                  </div>
                  <div
                    className="cursor-pointer opacity-70 lg:hover:opacity-100 transition-all duration-150"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <i className="bx bxs-trash text-lg text-white "></i>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --------BOX COMMENTS------ */}
        <div className="mt-10 px-0 lg:px-4">
          <div>
            <h2 className="font-semibold text-white/85">Deja tu comentario</h2>
          </div>

          <div className="mt-4">
            <form onSubmit={sendComment}>
              <div className="flex flex-col space-x-1">
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 text-2xl ${
                        star <= rating ? "text-[#fce803]" : "text-white/65"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div>
                  {errors.rating && (
                    <p className="text-red-600">{errors.rating[0]}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <textarea
                  name=""
                  id=""
                  required
                  placeholder="Comentario..."
                  className="text-white rounded-2xl w-full px-4 pb-48 pt-4 resize-none bg-black/30 backdrop-blur-sm"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>

                {errors.comment_text && (
                  <p className="text-red-600">{errors.comment_text[0]}</p>
                )}
              </div>

              {editingComment ? (
                <button
                  type="button"
                  className="text-white font-bold mt-3 border p-2 rounded-full"
                  onClick={() => handleUpdateComment()}
                >
                  Actualizar Comentario
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white font-bold text-xs mt-3 transition-all duration-100 border border-white/25 p-4 rounded-full uppercase lg:hover:bg-[#fce803] lg:hover:text-black lg:hover:border-black/25"
                >
                  Enviar
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="yellow-glow absolute h-[30%] w-[30%] top-[-10%] right-[-10%]"></div>
      </div>
    </section>
  );
};

export default BoxComments;
