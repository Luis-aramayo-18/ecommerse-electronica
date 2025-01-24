import { Navigate, Outlet } from "react-router-dom";
import { useCart } from "./Hooks/useCart";

const RoutesAuth = ({
  requiresAuth = false,
  requiresCart = false,
  requiresAdmin = false,
}) => {
  const { cart } = useCart();
  const token = localStorage.getItem("authToken");
  const userAdmin = localStorage.getItem("userAdmin") === "true";

  if (requiresAuth && !token) {
    return <Navigate to="/login" />;
  }

  if (requiresCart && cart.length === 0) {
    return <Navigate to="/products" />;
  }

  if (requiresAdmin && userAdmin !== true) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoutesAuth;
