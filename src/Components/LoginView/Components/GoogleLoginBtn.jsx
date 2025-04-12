import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../Hooks/useAuth";

const GoogleLoginBtn = ({ className }) => {
  const { loginGoogle } = useAuth();

  return (
    <GoogleLogin
      className={`${className}`}
      onSuccess={loginGoogle}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginBtn;
