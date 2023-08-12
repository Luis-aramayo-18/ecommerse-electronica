import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider ({children}) {

  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart,setCart] = useState(initialCart)

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

  

  const removeFromCart = product =>{
    const producInCartIndex = cart.findIndex(item=>item.id === product.id)

    if(producInCartIndex >= 0){
      const newCart = [...cart];
      newCart[producInCartIndex].quantity -= 1

      if (newCart[producInCartIndex].quantity < 1) {
        newCart.splice(producInCartIndex, 1); // Remove the product from the cart
      }

      return setCart(newCart)
    }
  }

  const clearCart = ()=>{
    setCart([])
  }

  const getTotalPrice =()=>{
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart,
      getTotalPrice,
       }}>
      {children}
    </CartContext.Provider>
  )
}