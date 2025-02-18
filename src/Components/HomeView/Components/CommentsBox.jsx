import React, { useEffect, useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";

import moment from "moment";

const CommentsBox = ({ api, userId, StyledSlider, settings }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [optionsComment, setOptionsComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [commentId, setCommentId] = useState();
  const [errors, setErrors] = useState({});
  const inputComment = useRef();

  const pageId = "homePage";

  useEffect(() => {
    const fetchComments = async () => {
      const response = await api.get(
        `/comments/get_comments?page_id=${pageId}`
      );

      if (response.status === 200) {
        setComments(response.data);
      }
    };
    fetchComments();
  }, []);

  const commentSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        comment_text: comment,
        page_id: pageId,
      };
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
    setIsEditing(true);
    setComment(data.comment_text);
    setCommentId(data.id);

    inputComment.current.scrollIntoView({ behavior: "smooth" });
    inputComment.current.focus();
  };

  const handleUpdateComment = async () => {
    console.log("hola");

    const dataComment = {
      comment_text: comment,
      page_id: pageId,
    };
    try {
      const response = await api.put(`/comments/${commentId}/`, dataComment);
      console.log(response);

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
        setErrors({});
        setIsEditing(false);
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
        setErrors({});
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("D [de] MMMM");
  };

  return (
    <section className="mx-6 sm:mx-6 md:mx-14 lg:mx-24 xl:mx-24 2xl:mx-24 flex flex-col justify-center mt-10">
      <div className="flex items-center text-center gap-1 uppercase mb-12 tracking-widest text-2xl font-semibold text-[#f0f7fe]">
        <h2>El mejor servicio</h2>
      </div>
      <div className="my-4">
        <StyledSlider {...settings}>
          {comments.map((comment) => (
            <div
              className="card-comments relative z-20 border-2 border-white p-5 min-h-[150px]"
              key={comment.id}
            >
              <div className="head-card flex items-center gap-3">
                <div>
                  {comment.user.image ? (
                    <img
                      className="h-12 w-12 object-cover rounded-full border"
                      src={
                        comment.user.image
                          ? `http://localhost:8000${comment.user.image}`
                          : `/public/img/home/user.png`
                      }
                      alt={comment.user.username}
                    />
                  ) : (
                    <img
                      className="h-12 w-12 object-cover rounded-full border"
                      src="/img/home/user.png"
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium first-letter:uppercase text-[#f0f7fe]">
                    {comment.user.username}
                  </h3>
                  <p className="text-sm font-light text-[#deecfb]">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>

              <div className="main-card mt-3 first-letter:uppercase text-[#CBD5E1]">
                <p>{comment.comment_text}</p>
              </div>

              {comment.user.id === parseFloat(userId) && (
                <div
                  className="flex flex-col items-end gap-3 absolute top-2 right-2 z-50"
                  onClick={() => setOptionsComment(!optionsComment)}
                >
                  <i className="bx bx-dots-vertical-rounded text-3xl"></i>
                  <div
                    className={`${
                      optionsComment
                        ? "flex flex-col items-start gap-2 rounded-lg p-4 bg-white text-black"
                        : "hidden"
                    }`}
                  >
                    <button onClick={() => handleEditComment(comment)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </StyledSlider>
      </div>

      <div className="flex flex-col gap-4 mt-20 lg:ms-5 w-full">
        <div className="text-lg font-medium text-[#deecfb]">
          <h2>Déjanos tu comentario</h2>
        </div>
        <div className="flex items-start gap-4 w-full">
          <form
            className="w-full flex flex-col items-start gap-4 bg-[#0F172A]"
            onSubmit={commentSubmit}
          >
            <textarea
              className="text-white  focus:outline-none focus:ring-2 focus:ring-[#9cccf4] shadow-lg  w-full px-4 pb-48 pt-4 resize-none border border-white bg-black/30 backdrop-blur-lg"
              ref={inputComment}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            {isEditing ? (
              <button
                className="text-white mt-3 p-4 border rounded-xl hover:bg-[#9cccf4] cursor-pointer text-sm font-semibold"
                type="button"
                onClick={() => handleUpdateComment()}
              >
                Actualizar
              </button>
            ) : (
              <button
                className="text-white mt-3 p-4 border-2 rounded-xl hover:bg-[#9cccf4] cursor-pointer text-sm font-semibold"
                type="submit"
              >
                Enviar
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommentsBox;
