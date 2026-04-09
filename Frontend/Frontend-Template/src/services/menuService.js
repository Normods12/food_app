import apiClient from '../apiClient';

export const menuService = {
    getAll: async () => {
        const response = await apiClient.get('/menu');
        return response.data;
    },

    getByCategory: async (categoryId) => {
        const response = await apiClient.get(`/menu/category/${categoryId}`);
        return response.data;
    },

    search: async (query) => {
        const response = await apiClient.get(`/menu/search?query=${query}`);
        return response.data;
    },

    create: async (itemData) => {
        const response = await apiClient.post('/menu', itemData);
        return response.data;
    }
};
