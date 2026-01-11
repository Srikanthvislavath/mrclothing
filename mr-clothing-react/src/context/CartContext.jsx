import React, { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";

const CartContext = createContext();
const CART_KEY = "mr_cart_react";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, size, qty = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === id && i.size === size);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = { ...copy[index], qty: copy[index].qty + qty };
        return copy;
      }
      return [...prev, { id, size, qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const totals = cart.reduce(
    (acc, item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return acc;
      acc.mrpTotal += p.mrp * item.qty;
      acc.total += p.price * item.qty;
      return acc;
    },
    { total: 0, mrpTotal: 0 }
  );
  const savings = totals.mrpTotal - totals.total;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotals: totals,
        savings,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
