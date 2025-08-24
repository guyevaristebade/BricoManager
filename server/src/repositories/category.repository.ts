import { Category } from '@prisma/client';
import prisma from '../config/db.config';
import { ICategory } from '../interfaces';

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
    create: async (categoryData: ICategory): Promise<Category> => {
        return await prisma.category.create({
            data: categoryData,
        });
    },

    // findCategoryWithUserTools: async (id: string, userId: string): Promise<Category | null> => {
    //     return await prisma.category.findUnique({
    //         where: { id },
    //         include: {
    //             tools: {
    //                 where: { userId  },
    //                 select: {
    //                     id: true,
    //                     toolName: true,
    //                     toolStatus: true,
    //                     location: {
    //                         select: {
    //                             id: true,
    //                             locationName: true,
    //                         },
    //                     },
    //                 },

    //             },
    //         },
    //     });
    // },
};
