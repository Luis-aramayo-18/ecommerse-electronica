import { Navigate, Outlet } from "react-router-dom";
import { useCart } from "./Hooks/useCart";
import Loading from "./Loading";

const RoutesAuth = ({
  requiresAuth = false,
  requiresCart = false,
  requiresAdmin = false,
}) => {
  const { cart, loading } = useCart(); // 'loading' es crucial aquí
  const token = localStorage.getItem("authToken");
  const userAdmin = localStorage.getItem("userAdmin") === "true";

  // 1. *** ESTE ES EL CAMBIO CLAVE ***
  // Si el carrito (o cualquier otra data crítica) está cargando,
  // NO hagas ninguna redirección todavía. Simplemente muestra un mensaje de carga.
  if (loading.get) {
    return <Loading />;
  }

  // 2. Validación de autenticación (si se requiere)
  if (requiresAuth && !token) {
    console.log(
      "RoutesAuth - Redirigiendo a /login: requiere autenticación y no hay token."
    );
    return <Navigate to="/login" />;
  }

  // 3. Validación de carrito (si se requiere)
  // Asegúrate de la estructura de 'cart'.
  // Si 'cart' es un objeto como { id: ..., items: [...] }, usa cart.items.length.
  // Si 'cart' es directamente un array de items, usa cart.length.
  // Por el backend que pasaste, lo más probable es que sea `cart.items.length`.
  if (requiresCart && (!cart || cart.length === 0)) {
    return <Navigate to="/" />;
  }

  // 4. Validación de administrador (si se requiere)
  if (requiresAdmin && userAdmin !== true) {
    console.log(
      "RoutesAuth - Redirigiendo a /: requiere ser admin y no lo es."
    );
    return <Navigate to="/" />;
  }

  // Si todas las validaciones pasan, permite el acceso a la ruta anidada
  return <Outlet />;
};

export default RoutesAuth;
