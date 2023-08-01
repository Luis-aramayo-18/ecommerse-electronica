import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider ({children}) {

  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart,setCart] = useState(initialCart)

  // useEffect(() => {
  //   // Load cart data from localStorage when the component mounts
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever the cart state changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product)=>{
    const producInCartIndex = cart.findIndex(item=>item.id === product.id)

    if(producInCartIndex >= 0){
      const newCart = [...cart];
      newCart[producInCartIndex].quantity += 1
      return setCart(newCart)
    } else{
      setCart(prevState => ([
        ...prevState,
        {
          ...product,
          quantity: 1
        }
      ]))
    }

  }

  const clearCart = ()=>{
    setCart([])
  }

  const removeFromCart = product =>{
    setCart(prevState=>prevState.filter(item=>item.id !== product.id))
  }

  return (
    <CartContext.Provider value={{cart,addToCart,clearCart,removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}