import React, { createContext, useEffect, useState } from "react";
import { useAxios } from "../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const api = useAxios();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true }));

      const sessionKey = localStorage.getItem("sessionKey");

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
      } else {
        const response = await api.get("/cart/my-cart/");

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

  const addToCart = async (product) => {
    try {
      setLoading((prev) => ({ ...prev, [product.id]: true }));
      const sessionKey = localStorage.getItem("sessionKey");

      const response = await api.post(
        "/cart/add-item/",
        {
          product_id: product.id,
          quantity: product.quantity ? product.quantity : 1,
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
      setLoading((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const addToMultiplateItems = async (productItems) => {
    try {
      const sessionKey = localStorage.getItem("sessionKey");
      setLoading((prev) => ({ ...prev, addMultiplateItems: true }));
      const response = await api.post(
        "/cart/add-multiplate-items/",
        productItems,
        {
          headers: {
            "X-Session-Key": sessionKey,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const sessionKey = response.data.session_key;
        localStorage.setItem("sessionKey", sessionKey);

        setCart(response.data.items);
        setTotalPrice(response.data.total_price);

        navigate("/formCompra");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading((prev) => ({ ...prev, addMultiplateItems: false }));
    }
  };

  const removeFromCart = async (product) => {
    try {
      setLoading((prev) => ({ ...prev, [product.id]: true }));

      const sessionKey = localStorage.getItem("sessionKey");
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
      } else {
        const response = await api.delete("/cart/remove-item/", {
          data: {
            product_id: product.product_detail.id,
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
      setLoading((prev) => ({ ...prev, [product.id]: false }));
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

  const formatPrice = (price) => {
    const priceAsNumber = parseFloat(price);

    if (isNaN(priceAsNumber)) {
      return "Formato de número inválido";
    }

    const formatter = new Intl.NumberFormat("es-AR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    });

    return formatter.format(priceAsNumber);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        addToMultiplateItems,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        loading,
        setLoading,
        updatingItemId,
        totalPrice,
        setTotalPrice,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
