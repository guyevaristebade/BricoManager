import { Category } from '@prisma/client';
import prisma from '../config/db.config';
import { categoryInput } from 'validators';

export const categoryRepository = {
    findAll: async (): Promise<Category[]> => {
        return await prisma.category.findMany({
            orderBy: {
                categoryName: 'asc',
            },
        });
    },

    findById: async (id: string): Promise<Category | null> => {
        return await prisma.category.findUnique({
            where: { id },
        });
    },

    // for admin
    create: async (categoryData: categoryInput): Promise<Category> => {
        return await prisma.category.create({
            data: categoryData,
        });
    },

    update: async (id: string, categoryData: categoryInput): Promise<Category> => {
        return await prisma.category.update({
            where: { id },
            data: categoryData,
        });
    },

    delete: async (id: string): Promise<Category> => {
        return await prisma.category.delete({
            where: { id },
        });
    },
};
