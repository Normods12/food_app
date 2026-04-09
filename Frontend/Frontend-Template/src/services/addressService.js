import apiClient from '../apiClient';

export const addressService = {
    getAll: async () => {
        const response = await apiClient.get('/addresses');
        return response.data;
    },

    add: async (addressData) => {
        const response = await apiClient.post('/addresses', addressData);
        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(`/addresses/${id}`);
        return response.data;
    }
};
