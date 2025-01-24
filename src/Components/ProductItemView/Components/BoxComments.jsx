import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import Loading from "../../Loading";

const BoxComments = ({comments, setComments, product, userID, api}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [errors, setErrors] = useState({});
  const [editingComment, setEditingComment] = useState(false);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="bx bxs-star text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="bx bxs-star"></i>);
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
    <section className="mt-20">
      <div>
        <div>
          <h2 className="text-lg font-bold">Opiniones del Producto</h2>
        </div>

        <div className="mt-10 max-h-52 overflow-y-auto">
          {comments && comments.length > 0 ? (
            <div className="pe-10">
              {comments.map((comment) => (
                <div
                  className="flex items-center gap-4 relative mb-8"
                  key={comment.id}
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden aspect-square">
                    <img
                      src={
                        comment.user.image
                          ? `http://localhost:8000${comment.user.image}`
                          : `/img/home/user.png`
                      }
                      alt={`foto de perfil de ${comment.user.username}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-semibold first-letter:uppercase">
                        {comment.user.username}
                      </h4>
                      <p className="text-white text-xs font-light">
                        {new Date(comment.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}
                      </p>
                    </div>

                    <div className="">{renderStars(comment.rating)}</div>

                    <div>
                      <p className="text-white lowercase first-letter:uppercase mt-1">
                        {comment.comment_text}
                      </p>
                    </div>
                  </div>

                  {comment.user.id === parseFloat(userID) && (
                    <div className="flex gap-3 absolute right-1 top-1">
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
          ) : comments.length === 0 ? (
            <p>No hay comentarios disponibles</p>
          ) : (
            <Loading/>
          )}
        </div>

        <div className="mt-10">
          <div>
            <h2 className="font-semibold">Deja tu comentario</h2>
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
                        star <= rating ? "text-yellow-500" : "text-gray-300"
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
                  placeholder="Comentario..."
                  className="shadow appearance-none resize-none p-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-28"
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
                  className="text-white font-bold mt-3 border p-2 rounded-md"
                  onClick={() => handleUpdateComment()}
                >
                  Actualizar Comentario
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white font-bold mt-3 border p-2 rounded-md"
                >
                  Enviar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxComments;
