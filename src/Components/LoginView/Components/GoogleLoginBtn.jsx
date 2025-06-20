import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../Hooks/useAuth";
import { useCart } from "../../Hooks/useCart";

const GoogleLoginBtn = ({ className }) => {
  const { loginGoogle } = useAuth();
  const { setCart, setTotalPrice } = useCart();

  const handleLoginGoogle = async (credentialResponse) => {
    const result = await loginGoogle(credentialResponse);
    
    if (result.success === true) {
      const cart = result.userData.cart.items
      const totalPrice = result.userData.cart.total_price;

      setCart(cart);
      setTotalPrice(totalPrice);
    }
  };

  return (
    <GoogleLogin
      className={`${className}`}
      onSuccess={handleLoginGoogle}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginBtn;
