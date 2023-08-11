import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider ({children}) {

  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart,setCart] = useState(initialCart)
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
      setTotalPrice(totalPrice + product.price)
    }

  }

  const incrementQuantity = (product) => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setTotalPrice(totalPrice + product.price);
  };

  const decrementQuantity = (product) => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      setTotalPrice(totalPrice - product.price);
    }
  };

  const clearCart = ()=>{
    setCart([])
    setTotalPrice(0)
    setQuantity(1)
  }

  const removeFromCart = product =>{
  const removedProduct = cart.find(item => item.id === product.id);
  const productTotalPrice = removedProduct.quantity * removedProduct.price;
  
  setCart(prevState => prevState.filter(item => item.id !== product.id));
  setTotalPrice(prevTotalPrice => prevTotalPrice - productTotalPrice);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      totalPrice,
      quantity
       }}>
      {children}
    </CartContext.Provider>
  )
}