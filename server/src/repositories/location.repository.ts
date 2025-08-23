import { Location } from '@prisma/client';
import prisma from '../config/db.config';
import { CreateLocationData, UpdateLocationData } from '../interfaces';

export const locationRepository = {
    create: async (data: CreateLocationData): Promise<Location> => {
        return prisma.location.create({
            data,
        });
    },

    findAll: async (userId: string): Promise<Location[]> => {
        return prisma.location.findMany({
            where: {
                userId,
            },
            include: {
                tools: {
                    select: {
                        // on selectionne uniquement les champs nécessaires
                        id: true,
                        toolName: true,
                        toolStatus: true,
                    },
                },
            },
            orderBy: {
                locationName: 'asc',
            },
        });
    },

    findById: async (id: string, userId: string): Promise<Location | null> => {
        return prisma.location.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                tools: {
                    select: {
                        id: true,
                        toolName: true,
                        toolStatus: true,
                    },
                },
            },
        });
    },

    findByName: async (userId: string, locationName: string): Promise<Location | null> => {
        return prisma.location.findFirst({
            where: {
                userId,
                locationName,
            },
        });
    },

    update: async (id: string, userId: string, data: UpdateLocationData): Promise<Location> => {
        return prisma.location.update({
            where: { id, userId },
            data,
            include: {
                tools: true,
            },
        });
    },

    delete: async (id: string, userId: string): Promise<void> => {
        await prisma.location.delete({
            where: {
                id,
                userId, // Prisma gérera l'erreur si pas trouvé
            },
        });
    },

    countToolsInLocation: async (locationId: string): Promise<number> => {
        return prisma.tool.count({
            where: {
                locationId,
            },
        });
    },

    isExistById: async (id: string, userId: string): Promise<Location | null> => {
        return await prisma.location.findUnique({
            where: {
                id,
                userId,
            },
        });
    },
};
