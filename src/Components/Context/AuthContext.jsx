import React, { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

import { googleLogout } from "@react-oauth/google";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  function getInitialUserData() {
    return {
      token: localStorage.getItem("authToken") || "",
      userAdmin: localStorage.getItem("userAdmin") || false,
      image: localStorage.getItem("profileImage") || null,
    };
  }

  const navigate = useNavigate();
  const [userData, setUserData] = useState(getInitialUserData());
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState({
    loginGoogle: false,
    loginEmail: false,
    register: false,
  });

  const loginGoogle = async (credentialResponse) => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        loginGoogle: true,
      }));

      const sessionKey = localStorage.getItem("sessionKey");
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
        localStorage.removeItem("sessionKey");

        const { token, is_staff, provider_auth, has_password, image, cart } =
          response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userAdmin", is_staff);
        localStorage.setItem("userProvider", provider_auth);
        localStorage.setItem("hasPassword", has_password);

        if (image) {
          localStorage.setItem("profileImage", image);
        }

        let newUserData = {
          token: token,
          userAdmin: is_staff,
          cart: cart,
          image: image,
        };

        setUserData(newUserData);

        navigate("/");
        setAuthError("");

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
    try {
      const sessionKey = localStorage.getItem("sessionKey");

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
        localStorage.removeItem("sessionKey");

        const { token, is_staff, provider_auth, has_password, image, cart } =
          response.data;

        let newUserData = {
          token: token,
          userAdmin: is_staff,
          cart: cart,
        };

        setUserData(newUserData);

        if (image) {
          localStorage.setItem("profileImage", image);
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("userAdmin", is_staff);
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProvider");
    localStorage.removeItem("userAdmin");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("hasPassword");

    try {
      googleLogout();

      const token = userData.token;

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
