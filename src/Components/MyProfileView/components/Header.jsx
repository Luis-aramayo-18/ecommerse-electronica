import React, { useEffect, useState } from "react";

import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";

const Header = ({ api }) => {
  const [provider, setProvider] = useState("");

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { setUserData, userData } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem("username");
    const provider = localStorage.getItem("userProvider");

    const img = localStorage.getItem("profileImage");
    if (img) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: img,
      }));
    }

    setUserData((prevUserData) => ({
      ...prevUserData,
      username: user,
    }));

    setProvider(provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const updateProfileImage = () => {
    const img = localStorage.getItem("profileImage");
    setUserData((prevFilters) => ({
      ...prevFilters,
      image: img,
    }));
    setPreview(img);
  };

  useEffect(() => {
    const imageUpdate = async () => {
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("image", imageFile);

          const response = await api.post("/upload-profile-image/", formData);
          console.log(response);

          if (response.status === 200) {
            const img = response.data.data.image;
            const message = response.data.message;
            const imgUrl = `http://localhost:8000${img}`;

            localStorage.setItem("profileImage", imgUrl);

            toast.success(`${message}`, {
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

            if (message) {
              updateProfileImage();
            }
          }
        } catch (error) {
          const errorMessage =
            error.response?.data.message ||
            error.response?.data.non_field_errors;
          toast.error(errorMessage, {
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
    imageUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <div className="flex items-center gap-4">
      <div className="w-[5rem] h-[5rem] lg:w-16 lg:h-16 rounded-full relative">
        {userData.image || preview ? (
          <img
            src={userData.image}
            alt={userData.username}
            className="w-full h-full object-cover rounded-full absolute border border-gray-200"
          />
        ) : (
          <label
            className="w-full h-full relative cursor-pointer"
            htmlFor="profileImage"
          >
            <img
              src="/img/home/user.png"
              alt="imagen genérica de perfil"
              className="w-full object-cover rounded-full absolute"
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="w-full h-full rounded-full cursor-pointer"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <div className="text-2xl font-semibold">
        <p className="text-base lg:text-lg font-semibold first-letter:uppercase text-[#f0f7fe]">
          {userData.username}
        </p>
        <p className="text-[#deecfb] text-sm font-light lg:hidden">
          {userData.email}
        </p>
      </div>
    </div>
  );
};

export default Header;
