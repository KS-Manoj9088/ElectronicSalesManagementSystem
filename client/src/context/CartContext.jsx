// CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const res = await cartAPI.addToCart({ productId, quantity });
    setCart(res.data);
    return res.data;
  };

  const updateCartItem = async (itemId, quantity) => {
    const res = await cartAPI.updateCartItem(itemId, { quantity });
    setCart(res.data);
    return res.data;
  };

  const removeFromCart = async (itemId) => {
    const res = await cartAPI.removeFromCart(itemId);
    setCart(res.data);
    return res.data;
  };

  const clearCart = async () => {
    await cartAPI.clearCart();
    setCart(null);
  };

  const value = useMemo(() => ({
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    cartItemsCount: cart?.totalItems || 0,
    cartTotal: cart?.totalPrice || 0,
  }), [cart, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};