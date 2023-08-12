import { Navigate, Outlet } from "react-router-dom"
import { useCart } from "./Hooks/useCart"

const RoutesAuth = () => {
    const {cart}=useCart()

    return cart.length===0? <Navigate to='/' /> : <Outlet />
}

export default RoutesAuth