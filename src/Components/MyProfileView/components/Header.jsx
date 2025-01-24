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
  }, [imageFile]);

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full relative">
        {userData.image || preview ? (
          <img
            src={userData.image}
            alt={userData.username}
            className="w-full h-full object-cover rounded-full absolute border border-gray-200 z-10"
          />
        ) : (
          <img
            src="/img/home/user.png"
            alt="imagen genérica de perfil"
            className="w-full object-cover rounded-full absolute z-10"
          />
        )}

        {provider === "email" && (
          <div>
            <label
              htmlFor="profileImage"
              className=" bg-white text-gray-800 border border-gray-600 flex justify-center items-center rounded-full text-center cursor-pointer absolute right-0 w-5 h-5 top-2/3 z-20"
            >
              <i className="bx bx-pencil"></i>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      <div className="text-2xl font-semibold">
        <p className="text-lg font-semibold first-letter:uppercase">
          {userData.username}
        </p>
      </div>
    </div>
  );
};

export default Header;
