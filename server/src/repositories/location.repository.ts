import { Location } from '@prisma/client';
import prisma from '../config/db.config';
import { LocationImgData, UpdateLocationData } from '../interfaces';
import { locationInput } from 'schemas';

export const locationRepository = {
    create: async (userId: string, data: locationInput, locationImgData?: LocationImgData): Promise<Location> => {
        return prisma.location.create({
            data: {
                ...data,
                userId,
                ...locationImgData,
            },
        });
    },

    findAll: async (userId: string): Promise<Location[]> => {
        return prisma.location.findMany({
            where: {
                userId,
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

    update: async (
        id: string,
        userId: string,
        data: UpdateLocationData,
        locationImgData?: LocationImgData
    ): Promise<Location> => {
        return prisma.location.update({
            where: { id, userId },
            data: {
                ...data,
                ...locationImgData,
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

    countTools: async (locationId: string): Promise<number> => {
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
