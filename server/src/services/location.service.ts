import { locationInput, updateLocationInput } from '../validators';
import { LocationImgData } from '../interfaces';
import { ConflitError, NotFoundError } from '../errors';
import { cloudinaryService } from './cloudinary.service';
import { locationRepository, toolRepository } from '../repositories';
import { cleanupFile } from '../helpers';
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

        let locationImgData: LocationImgData | undefined;

        if (file) {
            // upload location image on cloudinary
            const savedImage = await cloudinaryService.uploadFile(file, 'location');
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
    ): Promise<Location> => {
        const existingLocation = await locationRepository.isExistById(id, userId);

        if (!existingLocation) throw new NotFoundError('Location not found');

        let locationImgData: LocationImgData | undefined;

        if (file) {
            const savedImage = await cloudinaryService.uploadFile(file, 'location');
            locationImgData = {
                locationImgUrl: savedImage.secure_url,
                locationPublicId: savedImage.public_id,
            };

            if (existingLocation.locationPublicId) {
                await cloudinaryService.deleteFile(existingLocation.locationPublicId);
            }

            await cleanupFile(file.path);
        }

        const updateLocation = await locationRepository.update(id, userId, updateData, locationImgData);

        return updateLocation;
    },

    delete: async (id: string, userId: string): Promise<void> => {
        const existingLocation = await locationRepository.isExistById(id, userId);

        if (!existingLocation) throw new NotFoundError('Location not found');

        const countTools = await locationRepository.countTools(id);

        if (countTools > 0) throw new Error('Cannot delete location: tools are still associated with this location');

        if (existingLocation.locationPublicId) {
            await cloudinaryService.deleteFile(existingLocation.locationPublicId);
        }

        await locationRepository.delete(id, userId);
    },
};
