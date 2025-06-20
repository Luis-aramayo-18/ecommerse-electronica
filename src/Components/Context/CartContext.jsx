import React, { createContext, useEffect, useState } from "react";
import { useAxios } from "../Hooks/useAxios";
import { set } from "lodash";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const api = useAxios();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [loading, setLoading] = useState({
    addToCart: false,
    removeFromCart: false,
    increment: false,
    decrement: false,
    get: true,
  });

  useEffect(() => {
    const fetchCart = async () => {
      setLoading((prev) => ({ ...prev, get: true }));

      const sessionKey = localStorage.getItem("sessionKey");
      try {
        if (sessionKey) {
          const response = await api.get("/cart/my-cart/", {
            headers: {
              "X-Session-Key": sessionKey,
            },
          });
          
          if (response.status === 200) {
            const fetchedCart = response.data.items;
            setCart(fetchedCart);
            setTotalPrice(response.data.total_price);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => ({ ...prev, get: false }));
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const sessionKey = localStorage.getItem("sessionKey");

    try {
      setLoading((prev) => ({ ...prev, addToCart: true }));
      const response = await api.post(
        "/cart/add-item/",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );

      if (response.status === 201) {
        const sessionKey = response.data.session_key;
        localStorage.setItem("sessionKey", sessionKey);

        setCart(response.data.items);
        setTotalPrice(response.data.total_price);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading((prev) => ({ ...prev, addToCart: false }));
    }
  };

  const removeFromCart = async (product) => {
    const sessionKey = localStorage.getItem("sessionKey");

    try {
      setLoading((prev) => ({ ...prev, removeFromCart: true }));
      if (sessionKey) {
        const response = await api.delete("/cart/remove-item/", {
          data: {
            product_id: product.product_detail.id,
          },
          headers: {
            "X-Session-Key": sessionKey,
          },
        });

        if (response.status === 200) {
          const updateCart = cart.filter(
            (item) => item.product_detail.id !== product.product_detail.id
          );
          setCart(updateCart);
          setTotalPrice(response.data.total_price);
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading((prev) => ({ ...prev, removeFromCart: false }));
    }
  };

  const incrementQuantity = async (product) => {
    const sessionKey = localStorage.getItem("sessionKey");
    setUpdatingItemId(product.product_detail.id);
    try {
      setLoading((prev) => ({ ...prev, increment: true }));
      const response = await api.patch(
        "/cart/update-item/",
        {
          product_id: product.product_detail.id,
          quantity: product.quantity + 1,
        },
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );

      if (response.status === 200) {
        const updateCart = cart.map((item) => {
          if (item.product_detail.id === product.product_detail.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCart(updateCart);
        setTotalPrice(response.data.total_price);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, increment: false }));
      setUpdatingItemId(null);
    }
  };

  const decrementQuantity = async (product) => {
    const sessionKey = localStorage.getItem("sessionKey");
    setUpdatingItemId(product.product_detail.id);
    try {
      setLoading((prev) => ({ ...prev, decrement: true }));
      const response = await api.patch(
        "/cart/update-item/",
        {
          product_id: product.product_detail.id,
          quantity: product.quantity - 1,
        },
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );

      if (response.status === 200) {
        const updateCart = cart
          .map((item) => {
            if (item.product_detail.id === product.product_detail.id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
        setCart(updateCart);
        setTotalPrice(response.data.total_price);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, decrement: false }));
      setUpdatingItemId(null);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        loading,
        setLoading,
        updatingItemId,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
