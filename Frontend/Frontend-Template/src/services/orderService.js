import apiClient from '../apiClient';

export const orderService = {
    placeOrder: async (orderData) => {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await apiClient.get('/orders/my');
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await apiClient.get(`/orders/${id}`);
        return response.data;
    }
};
