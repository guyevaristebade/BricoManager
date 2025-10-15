import { Tool, ToolStatus } from '@prisma/client';
import prisma from '@config/db';
import { IToolImg, ToolFilters, createToolInput, updateToolInput } from '@modules/tools';

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

    findAll: async (userId: string, filters: ToolFilters): Promise<Tool[]> => {
        const { categoryId, locationId, toolStatus } = filters;
        // rajouter des filtres
        return await prisma.tool.findMany({
            where: {
                userId,
                ...(categoryId && { categoryId }),
                ...(locationId && { locationId }),
                ...(toolStatus && { toolStatus }),
            },
            include: {
                category: true,
                location: true,
            },
            orderBy: { toolName: 'asc' },
        });
    },

    // findAllWithDetails: async (userId: string): Promise<Tool[]> => {
    //     return await prisma.tool.findMany({
    //         where: {
    //             userId,
    //         },
    //         include: {
    //             category: true,
    //             location: true,
    //         },
    //     });
    // },

    findById: async (id: string, userId: string): Promise<Tool | null> => {
        return await prisma.tool.findUnique({
            where: { id, userId },
            include: {
                category: true,
                location: true,
            },
        });
    },

    findByLocationId: async (locationId: string, userId: string): Promise<Tool[]> => {
        return await prisma.tool.findMany({
            where: { locationId, userId },
            orderBy: { toolName: 'asc' },
        });
    },

    delete: async (id: string, userId: string): Promise<void> => {
        prisma.tool.delete({
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

    // changer le status de plusieurs outils en emprunter ou disponible
    changeToolStatus: async (userId: string, toolIds: string[], status: ToolStatus): Promise<void> => {
        await prisma.tool.updateMany({
            where: {
                userId,
                id: { in: toolIds },
            },
            data: {
                toolStatus: status,
            },
        });
    },

    // changer le status d'un outils en emprunter ou disponible
    changeSingleToolStatus: async (userId: string, toolId: string, status: ToolStatus): Promise<void> => {
        await prisma.tool.update({
            where: {
                id: toolId,
                userId,
            },
            data: {
                toolStatus: status,
            },
        });
    },
};
