import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

import { googleLogout } from "@react-oauth/google";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 

  const [loading, setLoading] = useState({
    loginGoogle: false,
    loginEmail: false,
    register: false,
  });
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
    const sessionKey = localStorage.getItem("sessionKey");
    try {
      setLoading((prevState) => ({
        ...prevState,
        loginGoogle: true,
      }));
      const credentialLogin = credentialResponse.credential;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}google-login/`,
        {
          credential: credentialLogin,
        },
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );

      if (response.status === 200) {
        const {
          token,
          username,
          email,
          is_staff,
          id,
          provider_auth,
          has_password,
          image,
          cart,
        } = response.data;

        let newUserData = {
          token: token,
          username: username,
          email: email,
          userAdmin: is_staff,
          userId: id,
          image: null,
          cart: cart,
        };

        if (image) {
          if (image.startsWith("http://") || image.startsWith("https://")) {
            setUserData((prevState) => ({
              ...prevState,
              image: image,
            }));

            localStorage.setItem("profileImage", image);
          } else {
            const imgUrl = `http://localhost:8000${image}`;

            setUserData((prevState) => ({
              ...prevState,
              image: imgUrl,
            }));

            localStorage.setItem("profileImage", imgUrl);
          }
        }

        setUserData(newUserData);

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userAdmin", is_staff);
        localStorage.setItem("userId", id);
        localStorage.setItem("userProvider", provider_auth);
        localStorage.setItem("hasPassword", has_password);

        if (is_staff) {
          navigate("/myAccount?section=admin");
        } else {
          navigate("/");
        }
        setAuthError("null");

        return { success: true, userData: newUserData };
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
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        loginGoogle: false,
      }));
    }
  };

  const loginEmail = async (data) => {
    const sessionKey = localStorage.getItem("sessionKey");

    try {
      setLoading((prevState) => ({
        ...prevState,
        loginEmail: true,
      }));

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login/`,
        data,
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );

      if (response.status === 200) {

        const {
          token,
          username,
          email,
          is_staff,
          id,
          provider_auth,
          has_password,
          image,
          cart,
        } = response.data;

        let newUserData = {
          token: token,
          username: username,
          email: email,
          userAdmin: is_staff,
          userId: id,
          image: null,
          cart: cart,
        };

        if (image) {
          if (image.startsWith("http://") || image.startsWith("https://")) {
            setUserData((prevState) => ({
              ...prevState,
              image: image,
            }));

            localStorage.setItem("profileImage", image);
          } else {
            const imgUrl = `http://localhost:8000${image}`;

            setUserData((prevState) => ({
              ...prevState,
              image: imgUrl,
            }));

            localStorage.setItem("profileImage", imgUrl);
          }
        }

        setUserData(newUserData);

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userAdmin", is_staff);
        localStorage.setItem("userId", id);
        localStorage.setItem("userProvider", provider_auth);
        localStorage.setItem("hasPassword", has_password);

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
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        loginEmail: false,
      }));
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
          localStorage.removeItem("sessionKey");
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
        userData,
        loginGoogle,
        loginEmail,
        logoutUsername,
        authError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
