import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { CartProvider } from './CartContext'
import Main from './Main'
import Login from './Login'
import Product from './Product'
import FormCompra from './FormCompra'


const RoutesApp = () => {
  return (
    <BrowserRouter>
    <CartProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/formCompra" element={<FormCompra />} />
        </Routes>
        </CartProvider>
    </BrowserRouter>
  )
}

export default RoutesApp