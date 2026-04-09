import apiClient from '../apiClient';

export const categoryService = {
    getAll: async () => {
        const response = await apiClient.get('/categories');
        return response.data;
    }
};
