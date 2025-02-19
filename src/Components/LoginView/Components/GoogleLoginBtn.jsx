import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../Hooks/useAuth";

const GoogleLoginBtn = () => {
  const { loginGoogle } = useAuth();

  return (
    <GoogleLogin
      className="hola"
      onSuccess={loginGoogle}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginBtn;
