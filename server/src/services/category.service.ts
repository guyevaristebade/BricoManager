import prisma from '../config/db.config';
import { categoryInput } from '../schemas';
import { ApiResponse } from '../types';
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

    // create: async (categoryData: categoryInput) => {
    //     const apiResponse: ApiResponse = {
    //         success: false,
    //         status: 201,
    //         data: null,
    //         timestamp: Date.now().toLocaleString(),
    //     };

    //     const category = await prisma.category.create({
    //         data: categoryData,
    //     });

    //     if (!category) {
    //         throw new Error('Failed to create category');
    //     }

    //     apiResponse.success = true;
    //     apiResponse.message = 'Category created successfully';
    //     apiResponse.data = category;

    //     return apiResponse;
    // },

    // update: async (categoryId: string, categoryData: categoryInput) => {
    //     const apiResponse: ApiResponse = {
    //         success: false,
    //         status: 200,
    //         data: null,
    //         timestamp: Date.now().toLocaleString(),
    //     };

    //     const category = await prisma.category.update({
    //         where: { id: categoryId },
    //         data: categoryData,
    //     });

    //     if (!category) {
    //         throw new Error('Failed to update category');
    //     }

    //     apiResponse.success = true;
    //     apiResponse.message = 'Category updated successfully';
    //     apiResponse.data = { category };

    //     return apiResponse;
    // },
};
