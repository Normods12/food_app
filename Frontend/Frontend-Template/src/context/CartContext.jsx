import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/cartService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCartItems([]);
            setCartTotal(0);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        setLoadingCart(true);
        try {
            const data = await cartService.getCart();
            if (data && data.items) {
                setCartItems(data.items);
                calculateTotal(data.items);
            }
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoadingCart(false);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => {
            return acc + (parseFloat(item.menuItem.price) * item.quantity);
        }, 0);
        setCartTotal(total);
    };

    const addToCart = async (menuItemId, quantity = 1) => {
        try {
            if (!isAuthenticated) throw new Error("Please login to add items to cart!");

            const updatedCart = await cartService.addToCart(menuItemId, quantity);
            setCartItems(updatedCart.items);
            calculateTotal(updatedCart.items);
            return true;
        } catch (error) {
            console.error("Failed to add to cart", error);
            throw error;
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const updatedCart = await cartService.updateQuantity(cartItemId, quantity);
            setCartItems(updatedCart.items);
            calculateTotal(updatedCart.items);
            return true;
        } catch (error) {
            console.error("Failed to update cart quantity", error);
            throw error;
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            const updatedCart = await cartService.removeItem(cartItemId);
            setCartItems(updatedCart.items);
            calculateTotal(updatedCart.items);
            return true;
        } catch (error) {
            console.error("Failed to remove item", error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCartItems([]);
            setCartTotal(0);
        } catch (error) {
            console.error("Failed to clear cart", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            loadingCart,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
