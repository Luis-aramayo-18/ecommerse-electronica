import React, { useEffect, useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";

import moment from "moment";

const CommentsBox = ({ api, userId, StyledSlider }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [commentId, setCommentId] = useState();
  const [errors, setErrors] = useState({});

  const [activeCommentId, setActiveCommentId] = useState(null);

  const cardRefs = useRef({});
  const inputComment = useRef();

  const pageId = "homePage";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await api.get(
        `/comments/get_comments/?page_id=${pageId}`
      );

      if (response.status === 200) {
        setComments(response.data);
      }
    };
    fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commentSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        comment_text: comment,
        page_id: pageId,
      };
      const response = await api.post("/comments/", commentData);

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
          toast.error(`${errorFields || errors}`, {
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
    const dataComment = {
      comment_text: comment,
      page_id: pageId,
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const ref = cardRefs.current[activeCommentId];
      if (ref && !ref.contains(event.target)) {
        setActiveCommentId(null);
      }
    };

    if (activeCommentId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeCommentId]);

  const handleCardClick = (id) => {
    setActiveCommentId((prevId) => (prevId === id ? null : id));
  };

  console.log(comments);

  return (
    <section className="mx-6 sm:mx-6 md:mx-14 lg:mx-24 xl:mx-24 2xl:mx-24 flex flex-col justify-center mt-28 sm:mt-10">
      <div className="flex items-center text-center gap-1 uppercase mb-8 sm:mb-12 tracking-widest text-2xl font-semibold text-[#f0f7fe]">
        <h2>El mejor servicio</h2>
      </div>

      {/* -----COMMENTS------ */}
      <div className="my-4">
        <StyledSlider {...settings}>
          {comments.map((comment) => (
            <div
              className={`${
                comment.user.id === parseFloat(userId)
                  ? "cursor-pointer shadow-slate-400 hover:shadow-md "
                  : ""
              } card-comments relative z-20  rounded-xl bg-black/70 border border-gray-500 backdrop-blur-sm p-5 min-h-[150px]`}
              key={comment.id}
              ref={(el) => (cardRefs.current[comment.id] = el)}
              onClick={
                comment.user.id === parseFloat(userId)
                  ? () => handleCardClick(comment.id)
                  : null
              }
            >
              <div className="head-card flex items-center relative w-full gap-3">
                <div className="relative">
                  {comment ? (
                    <img
                      className="w-12 h-12 object-cover rounded-full border"
                      src={comment.user.image}
                      alt={comment.user.username}
                    />
                  ) : (
                    <img
                      className="h-12 w-24 object-cover rounded-full border"
                      src="/img/home/user.png"
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium first-letter:uppercase text-white">
                    {comment.user.username}
                  </h3>
                  <p className="text-sm font-light text-gray-400">
                    {formatDate(comment.created_at)}
                  </p>
                </div>

                <img
                  src="/img/home/google.png"
                  alt="logo google"
                  className="w-6 h-6 absolute right-0"
                />
              </div>

              <div className="main-card mt-3 first-letter:uppercase text-white text-sm font-light">
                <p>{comment.comment_text}</p>
              </div>

              <div
                className={`absolute top-0 left-0 w-full rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm transition-all duration-200 ease-in-out ${
                  activeCommentId === comment.id
                    ? "h-full opacity-100"
                    : "h-0 opacity-0"
                } flex flex-col justify-center items-center`}
              >
                <button
                  onClick={(e) => {
                    handleEditComment(comment);
                  }}
                  className="w-[40%] border p-3 rounded-xl lg:hover:bg-[#fea401] cursor-pointer text-sm font-semibold text-white"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    handleDeleteComment(comment.id);
                  }}
                  className="w-[40%] border p-3 mt-2 rounded-xl lg:hover:bg-[#fea401] cursor-pointer text-sm font-semibold text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </StyledSlider>
      </div>

      {/* --------BOX-COMMENTS-------- */}
      <div className="flex flex-col gap-4 mt-10 sm:mt-20 lg:ms-5 w-full">
        <div className="text-lg font-medium text-[#deecfb]">
          <h2>Déjanos tu comentario</h2>
        </div>
        <div className="flex items-start gap-4 w-full">
          <form
            className="w-full flex flex-col items-start gap-4 bg-[#0F172A]"
            onSubmit={commentSubmit}
          >
            <textarea
              className="text-white  focus:outline-none focus:ring-2 focus:ring-[#9cccf4] shadow-lg  w-full px-4 pb-48 pt-4 resize-none bg-black/70 border border-gray-500 backdrop-blur-sm"
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
