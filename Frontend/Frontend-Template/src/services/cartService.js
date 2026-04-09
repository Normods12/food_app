import apiClient from '../apiClient';

export const cartService = {
    getCart: async () => {
        const response = await apiClient.get('/cart');
        return response.data;
    },

    addToCart: async (menuItemId, quantity) => {
        const response = await apiClient.post(`/cart/add?menuItemId=${menuItemId}&quantity=${quantity}`);
        return response.data;
    },

    updateQuantity: async (cartItemId, quantity) => {
        const response = await apiClient.put(`/cart/update?cartItemId=${cartItemId}&quantity=${quantity}`);
        return response.data;
    },

    removeItem: async (cartItemId) => {
        const response = await apiClient.delete(`/cart/remove/${cartItemId}`);
        return response.data;
    },

    clearCart: async () => {
        const response = await apiClient.delete('/cart/clear');
        return response.data;
    }
};
