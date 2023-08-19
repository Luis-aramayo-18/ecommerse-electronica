import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { CartProvider } from './CartContext'
import Main from './Main'
import Product from './Product'
import FormCompra from './FormCompra'
import RoutesAuth from './RoutesAuth'


const RoutesApp = () => {
  return (
    <BrowserRouter>
    <CartProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/" element={<RoutesAuth />} >
          <Route path="/formCompra" element={<FormCompra />} />
          </Route>
        </Routes>
        </CartProvider>
    </BrowserRouter>
  )
}

export default RoutesApp