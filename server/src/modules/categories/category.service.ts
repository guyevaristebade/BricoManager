import { Category } from '@prisma/client';
import { categoryRepository, categoryInput } from '@modules/categories';
import { validateIds } from '@common/utils/validateIds';

export const categoryService = {
    findAll: async (): Promise<Category[]> => {
        return await categoryRepository.findAll();
    },

    findById: async (id: string): Promise<Category | null> => {
        validateIds({ id });
        return await categoryRepository.findById(id);
    },

    // only admin
    create: async (categoryData: categoryInput): Promise<Category> => {
        return await categoryRepository.create(categoryData);
    },

    update: async (id: string, categoryData: categoryInput): Promise<Category> => {
        validateIds({ id });
        return await categoryRepository.update(id, categoryData);
    },

    delete: async (id: string): Promise<void> => {
        validateIds({ id });
        await categoryRepository.delete(id);
    },
};
