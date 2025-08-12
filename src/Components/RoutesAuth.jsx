import { Navigate, Outlet } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import Loading from "./Loading";

const RoutesAuth = ({
  requiresAuth = false,
  requiresCart = false,
  requiresAdmin = false,
}) => {
  const { cart, loading } = useCart();
  const token = localStorage.getItem("authToken");
  const userAdmin = localStorage.getItem("userAdmin") === "true";

  if (loading.get) {
    return <Loading />;
  }

  if (requiresAuth && !token) {
    console.log(
      "RoutesAuth - Redirigiendo a /login: requiere autenticación y no hay token."
    );
    return <Navigate to="/login" />;
  }

  if (requiresCart && (!cart || cart.length === 0)) {
    return <Navigate to="/" />;
  }

  if (requiresAdmin && userAdmin !== true) {
    console.log(
      "RoutesAuth - Redirigiendo a /: requiere ser admin y no lo es."
    );
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoutesAuth;
