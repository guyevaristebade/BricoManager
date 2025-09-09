import { locationInput, updateLocationInput } from '../schemas';
import { ApiResponse, LocationImageData } from '../interfaces';
import { ConflitError, NotFoundError } from '../errors';
import { cloudinaryService } from './cloudinary.service';
import { locationRepository, toolRepository } from '../repositories';
import { cleanupFile } from 'helpers';
import { Location, Tool } from '@prisma/client';

export const locationService = {
    create: async (
        userId: string,
        createLocationData: locationInput,
        file?: Express.Multer.File
    ): Promise<Location> => {
        // Vérifier si une location avec ce nom existe déjà pour cet utilisateur
        const existingLocation = await locationRepository.findByName(userId, createLocationData.locationName);

        if (existingLocation) throw new ConflitError('Location already exists');

        let locationImgData: LocationImageData | undefined;

        if (file) {
            // upload location image on cloudinary
            const savedImage = await cloudinaryService.upload(file, 'location');
            locationImgData = {
                locationImgUrl: savedImage.secure_url,
                locationPublicId: savedImage.public_id,
            };
            // Clean up the local file after upload
            await cleanupFile(file.path);
        }

        const location = await locationRepository.create(userId, createLocationData, locationImgData);

        return location;
    },

    findAll: async (userId: string): Promise<Location[]> => {
        const locations = await locationRepository.findAll(userId);
        return locations;
    },

    findById: async (id: string, userId: string): Promise<{ location: Location; tools: Tool[] }> => {
        const location = await locationRepository.findById(id, userId);

        if (!location) throw new NotFoundError('Location not found');

        const tools = await toolRepository.findByLocationId(id, userId);

        return { location, tools };
    },

    update: async (
        id: string,
        updateData: updateLocationInput,
        userId: string,
        file?: Express.Multer.File
    ): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await locationRepository.isExistById(id, userId);

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
                location = await locationRepository.update(id, userId, {
                    ...updateData,
                    locationImgUrl: savedImage.secure_url,
                    locationPublicId: savedImage.public_id,
                });
            } catch (error) {
                // En cas d'erreur upload, on met à jour seulement les autres données
                location = await locationRepository.update(id, userId, updateData);
            }
        } else {
            // Cas 3 : Pas de nouvelle image, mise à jour des données seulement
            location = await locationRepository.update(id, userId, updateData);
        }

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location updated successfully';

        return apiResponse;
    },

    delete: async (id: string, userId: string): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await locationRepository.isExistById(id, userId);

        if (!existingLocation) throw new NotFoundError('Location not found');

        const toolsInThisLocation = await locationRepository.countToolsInLocation(id);

        if (toolsInThisLocation > 0)
            throw new Error('Cannot delete location: tools are still associated with this location');

        if (existingLocation.locationPublicId) {
            await cloudinaryService.delete(existingLocation.locationPublicId);
        }

        await locationRepository.delete(id, userId);

        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location deleted successfully';

        return apiResponse;
    },
};
