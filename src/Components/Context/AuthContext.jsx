import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

import { googleLogout } from "@react-oauth/google";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authError, setAuthError] = useState("");
  const [userData, setUserData] = useState({
    token: localStorage.getItem("authToken") || "",
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("userEmail") || "",
    userAdmin: localStorage.getItem("userAdmin") || "",
    userId: localStorage.getItem("userId") || "",
    image: localStorage.getItem("profileImage") || null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserAdmin = localStorage.getItem("userAdmin");
    const storedUserId = localStorage.getItem("userId");
    const storedImage = localStorage.getItem("profileImage");

    if (storedToken) {
      setUserData({
        token: storedToken,
        username: storedUsername,
        email: storedEmail,
        userAdmin: storedUserAdmin,
        userId: storedUserId,
        image: storedImage,
      });
    }
  }, []);

  const loginGoogle = async (credentialResponse) => {
    try {
      const credentialLogin = credentialResponse.credential;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}google-login/`,
        {
          credential: credentialLogin,
        }
      );
      console.log(response);
      

      if (response.status === 200) {
        toast.success(`Bienvenido`, {
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

        const {
          token,
          username,
          email,
          is_staff,
          id,
          provider_auth,
          has_password,
        } = response.data;

        setUserData({
          token: token,
          username: username,
          email: email,
          userAdmin: is_staff,
          userId: id,
        });

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userAdmin", response.data.is_staff);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userProvider", provider_auth);
        localStorage.setItem("hasPassword", has_password);

        if (response.data.image) {
          const img = response.data.image;

          if (img.startsWith("http://") || img.startsWith("https://")) {
            setUserData((prevState) => ({
              ...prevState,
              image: img,
            }));

            localStorage.setItem("profileImage", img);
          } else {
            const imgUrl = `http://localhost:8000${img}`;

            setUserData((prevState) => ({
              ...prevState,
              image: imgUrl,
            }));

            localStorage.setItem("profileImage", imgUrl);
          }
        }

        if (is_staff) {
          navigate("/myAccount?section=admin");
        } else {
          navigate("/");
        }
        setAuthError(null);
      }
    } catch (error) {
      const errorMessage =
        error.response.data.error || "Error al iniciar sesión";
      setAuthError(errorMessage);

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
  };

  const loginUsername = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login/`,
        data
      );

      if (response.status === 200) {
        toast.success(`Bienvenido`, {
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

        const {
          token,
          username,
          email,
          is_staff,
          id,
          provider_auth,
          has_password,
        } = response.data;

        setUserData({
          token: token,
          username: username,
          email: email,
          userAdmin: is_staff,
          userId: id,
        });

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("hasPassword", has_password);
        localStorage.setItem("userAdmin", response.data.is_staff);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userProvider", provider_auth);

        if (response.data.image) {
          const img = response.data.image;

          if (img.startsWith("http://") || img.startsWith("https://")) {
            setUserData((prevState) => ({
              ...prevState,
              image: img,
            }));

            localStorage.setItem("profileImage", img);
          } else {
            const imgUrl = `http://localhost:8000${img}`;

            setUserData((prevState) => ({
              ...prevState,
              image: imgUrl,
            }));

            localStorage.setItem("profileImage", imgUrl);
          }
        }

        if (is_staff) {
          navigate("/myAccount?section=admin");
        } else {
          navigate("/");
        }
        setAuthError(null);
      }
    } catch (error) {
      const errorMessage =
        error.response.data.error || "Error al iniciar sesión";
      setAuthError(errorMessage);

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
  };

  const logoutUsername = async () => {
    try {
      googleLogout();

      const token = localStorage.getItem("authToken");

      if (token) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}logout/`,
          {},
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (response.status === 200) {
          setUserData({
            token: null,
            username: null,
            email: null,
            userAdmin: null,
            userId: null,
            image: null,
          });

          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userProvider");
          localStorage.removeItem("userAdmin");
          localStorage.removeItem("userId");
          localStorage.removeItem("profileImage");
          localStorage.removeItem("hasPassword");
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUserData,
        // setListenerUpdates,
        userData,
        loginGoogle,
        loginUsername,
        logoutUsername,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
