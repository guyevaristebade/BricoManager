import { ApiResponse } from '../interfaces';
import { categoryRepository } from '../repositories';

export const categoryService = {
    findAll: async () => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const categories = await categoryRepository.findAll();

        apiResponse.data = categories;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Categories retrieved successfully';

        return apiResponse;
    },

    findById: async (id: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const category = await categoryRepository.findById(id);

        apiResponse.data = category;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Category retrieved successfully';

        return apiResponse;
    },
};
