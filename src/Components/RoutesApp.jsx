import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Context/CartContext";

import Products from "./ListProductsView/Products";
import Product from "./ProductItemView/Product";
import FormCompra from "./PaymentView/FormCompra";
import RoutesAuth from "./RoutesAuth";
import Home from "./HomeView/Home";
import Contact from "./ContactView/Contact";
import Login from "./LoginView/Login";
import Nav from "./Nav";
import MyAccount from "./MyProfileView/MyAccount";
import GoogleLoginBtn from "./LoginView/Components/GoogleLoginBtn";

const RoutesApp = () => {
  return (
    <>
      <ToastContainer />
      <CartProvider>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/category/:categoryId" element={<Products />} />
          <Route path="/google" element={<GoogleLoginBtn />} />
          <Route
            path="/products/category/:categoryId/product/:productId"
            element={<Product />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RoutesAuth requiresAuth={true} />}>
            <Route path="/myAccount" element={<MyAccount />} />
          </Route>
          <Route
            path="/"
            element={<RoutesAuth requiresAuth={true} requiresCart={true} />}
          >
            <Route path="/formCompra" element={<FormCompra />} />
          </Route>
          {/* <Route path="/" element={<RoutesAuth requiresAdmin={true} />}>
            <Route path="/formProduct" element={<FormProduct />} />
          </Route> */}
        </Routes>
      </CartProvider>
    </>
  );
};

export default RoutesApp;
