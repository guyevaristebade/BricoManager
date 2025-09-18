import { Category } from '@prisma/client';
import { categoryRepository } from '../repositories';
import { categoryInput } from 'validators';

export const categoryService = {
    findAll: async (): Promise<Category[]> => {
        return await categoryRepository.findAll();
    },

    findById: async (id: string): Promise<Category | null> => {
        return await categoryRepository.findById(id);
    },

    // only admin
    create: async (categoryData: categoryInput): Promise<Category> => {
        return await categoryRepository.create(categoryData);
    },

    update: async (id: string, categoryData: categoryInput): Promise<Category> => {
        return await categoryRepository.update(id, categoryData);
    },

    delete: async (id: string): Promise<Category> => {
        return await categoryRepository.delete(id);
    },
};
