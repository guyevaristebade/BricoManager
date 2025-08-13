import { prisma } from 'config';
import { categoryInput } from 'schemas/category.schema';
import { ApiResponse } from 'types';

export const categoryService = {
    create: async (categoryData: categoryInput) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 201,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        const category = await prisma.category.create({
            data: categoryData,
        });

        if (!category) {
            throw new Error('Failed to create category');
        }

        apiResponse.success = true;
        apiResponse.message = 'Category created successfully';
        apiResponse.data = category;

        return apiResponse;
    },

    edit: async (categoryId: string, categoryData: categoryInput) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 200,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        const category = await prisma.category.update({
            where: { id: categoryId },
            data: categoryData,
        });

        if (!category) {
            throw new Error('Failed to update category');
        }

        apiResponse.success = true;
        apiResponse.message = 'Category updated successfully';
        apiResponse.data = { category };

        return apiResponse;
    },

    delete: async (categoryId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 200,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        const category = await prisma.category.delete({
            where: { id: categoryId },
        });

        if (!category) {
            throw new Error('Failed to delete category');
        }

        apiResponse.success = true;
        apiResponse.message = 'Category deleted successfully';
        apiResponse.data = { category };

        return apiResponse;
    },
};
