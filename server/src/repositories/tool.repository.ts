import prisma from '@config/db.config';
import { IToolImg } from '../interfaces';
import { createToolInput, updateToolInput } from '../schemas';
import { Tool } from '@prisma/client';

export const toolRepository = {
    create: async (userId: string, createToolData: createToolInput, imgData: IToolImg): Promise<Tool> => {
        return await prisma.tool.create({
            data: {
                userId,
                ...createToolData,
                ...imgData,
            },
        });
    },

    findAll: async (userId: string): Promise<Tool[]> => {
        // rajouter des filtres
        return await prisma.tool.findMany({
            where: {
                userId,
            },
            include: {
                category: true,
                location: true,
            },
        });
    },

    findById: async (id: string, userId: string): Promise<Tool | null> => {
        return await prisma.tool.findUnique({
            where: { id, userId },
        });
    },

    delete: async (id: string, userId: string): Promise<Tool | null> => {
        return prisma.tool.delete({
            where: { id, userId },
        });
    },

    update: async (id: string, userId: string, updateToolData: updateToolInput, imgData?: IToolImg): Promise<Tool> => {
        return await prisma.tool.update({
            where: { id, userId },
            data: {
                ...updateToolData,
                toolImageUrl: imgData?.toolImageUrl,
                toolPublicId: imgData?.toolPublicId,
            },
        });
    },

    isExistByName: async (userId: string, toolName: string): Promise<Boolean> => {
        const tool = await prisma.tool.findFirst({
            where: {
                userId,
                toolName,
            },
        });

        return tool !== null;
    },
};
