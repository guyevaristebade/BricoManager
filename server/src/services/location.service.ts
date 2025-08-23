import { locationInput, updateLocationInput } from '../schemas';
import { ApiResponse } from '../types';
import { NotFoundError } from '../errors';
import { cloudinaryService } from './cloudinary.service';
import { CreateLocationData } from '../interfaces';
import { locationRepository } from '../repositories';

export const locationService = {
    create: async (
        createLocationData: locationInput,
        userId: string,
        file?: Express.Multer.File
    ): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        // Vérifier si une location avec ce nom existe déjà pour cet utilisateur
        const existingLocation = await locationRepository.findByName(userId, createLocationData.locationName);

        if (existingLocation) {
            throw new Error('Location already exists');
        }

        let locationData: CreateLocationData = {
            ...createLocationData,
            userId,
        };

        if (file) {
            // upload location image on cloudinary
            const savedImage = await cloudinaryService.upload(file, 'location');
            locationData = {
                ...locationData,
                locationImgUrl: savedImage.secure_url,
                locationPublicId: savedImage.public_id,
            };
        }

        const location = await locationRepository.create(locationData);

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 201;
        apiResponse.message = 'Location created successfully';

        return apiResponse;
    },

    findAll: async (userId: string): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const locations = await locationRepository.findAll(userId);

        apiResponse.data = locations;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Locations retrieved successfully';

        return apiResponse;
    },

    findById: async (id: string, userId: string): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const location = await locationRepository.findById(id, userId);

        if (!location) throw new NotFoundError('Location not found');

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location retrieved successfully';

        return apiResponse;
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
