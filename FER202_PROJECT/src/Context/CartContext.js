import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();
// quản lí trạng thái giỏ hàng
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
// lấy dnah sách sản phẩm trong giỏ hàng
    useEffect(() => {
        axios.get('http://localhost:9999/cart')
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    const addToCart = (product) => {
        axios.post('http://localhost:9999/cart', product)
            .then(response => {
                setCart([...cart, response.data]);
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:9999/cart/${productId}`)
            .then(() => {
                setCart(cart.filter(product => product.id !== productId));
            })
            .catch(error => console.error('Error removing from cart:', error));
    };

    const clearCart = () => {
        const deleteRequests = cart.map(product => axios.delete(`http://localhost:9999/cart/${product.id}`));
        Promise.all(deleteRequests)
            .then(() => setCart([]))
            .catch(error => console.error('Error clearing cart:', error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
