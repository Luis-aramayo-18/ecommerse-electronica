import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { CartProvider } from './CartContext'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Product from './Product'
import Cart from './Cart'


const RoutesApp = () => {
  return (
    <BrowserRouter>
    <CartProvider>
    <Cart />
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
        </CartProvider>
    </BrowserRouter>
  )
}

export default RoutesApp