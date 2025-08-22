import { locationInput } from '../schemas';
import prisma from '../config/db.config';
import { ApiResponse } from '../types';
import { NotFoundError } from '../errors';
import { cloudinaryService } from './cloudinary.service';
import { cleanupFile } from '../helpers';

export const locationService = {
    create: async (createLocationData: locationInput, userId: string, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        let location;

        if (!userId) {
            throw new Error('User ID is required');
        }

        if (file) {
            // upload location image on cloudinary
            const savedImage = await cloudinaryService.upload(file, 'location');
            location = await prisma.location.create({
                data: {
                    ...createLocationData,
                    userId,
                    locationImgUrl: savedImage.secure_url,
                    locationPublicId: savedImage.public_id,
                },
            });
            // cleanup temporary file
            await cleanupFile(file.path);
        } else {
            location = await prisma.location.create({
                data: { ...createLocationData, userId },
            });
        }

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 201;
        apiResponse.message = 'Location created successfully';

        return apiResponse;
    },

    findAll: async (userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const locations = await prisma.location.findMany({
            where: { userId },
        });

        apiResponse.data = locations;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Locations retrieved successfully';

        return apiResponse;
    },

    findById: async (id: string, userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const location = await prisma.location.findUnique({
            where: { id, userId },
        });

        if (!location) throw new NotFoundError('Location not found');

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location retrieved successfully';

        return apiResponse;
    },

    update: async (id: string, updateData: locationInput, userId: string, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await prisma.location.findUnique({
            where: { id, userId },
        });

        if (!existingLocation) throw new NotFoundError('Location not found');

        let location;

        // Cas 1 & 2 : Nouvelle image fournie
        if (file) {
            try {
                // Upload nouvelle image
                const savedImage = await cloudinaryService.upload(file, 'location');

                // Supprimer l'ancienne image SEULEMENT après succès du nouvel upload
                if (existingLocation.locationPublicId) {
                    await cloudinaryService.delete(existingLocation.locationPublicId);
                }

                // Mise à jour avec nouvelle image + données
                location = await prisma.location.update({
                    where: { id, userId },
                    data: {
                        ...updateData,
                        locationImgUrl: savedImage.secure_url,
                        locationPublicId: savedImage.public_id,
                    },
                });

                // Nettoyage du fichier temporaire
                await cleanupFile(file.path);
            } catch (error) {
                // En cas d'erreur upload, on met à jour seulement les autres données
                location = await prisma.location.update({
                    where: { id },
                    data: updateData,
                });
            }
        } else {
            // Cas 3 : Pas de nouvelle image, mise à jour des données seulement
            location = await prisma.location.update({
                where: { id, userId },
                data: updateData,
            });
        }

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location updated successfully';

        return apiResponse;
    },

    delete: async (id: string, userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await prisma.location.findUnique({
            where: { id, userId },
        });

        if (!existingLocation) throw new NotFoundError('Location not found');

        const toolsInThisLocation = await prisma.tool.findMany({
            where: { locationId: id },
        });

        if (toolsInThisLocation.length > 0)
            throw new Error('Cannot delete location: tools are still associated with this location');

        if (!existingLocation.locationPublicId && !existingLocation.locationPublicId) {
            await prisma.location.delete({
                where: { id, userId },
            });
        } else {
            await cloudinaryService.delete(existingLocation.locationPublicId!);
            await prisma.location.delete({
                where: { id, userId },
            });
        }

        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location deleted successfully';

        return apiResponse;
    },
};
