import { Location, Tool } from '@prisma/client';
import { createLocationInput, LocationImgData, locationRepository, updateLocationInput } from '@modules/locations';
import { cloudinaryService } from '@common/services/cloudinary.service';
import { cleanupFile } from '@common/utils/file';
import { toolRepository } from '@modules/tools';
import { HttpException } from '@common/errors/httpException';
import { validateIds } from '@common/utils/validateIds';

export const locationService = {
    create: async (
        userId: string,
        createLocationData: createLocationInput,
        file?: Express.Multer.File
    ): Promise<Location> => {
        validateIds({ userId });

        // Vérifier si une location avec ce nom existe déjà pour cet utilisateur
        const existingLocation = await locationRepository.findByName(userId, createLocationData.locationName);

        if (existingLocation) throw new HttpException('CConflict', 409, 'Location already exists');

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
        validateIds({ userId });
        const locations = await locationRepository.findAll(userId);
        return locations;
    },

    findById: async (id: string, userId: string): Promise<{ location: Location; tools: Tool[] }> => {
        validateIds({ id, userId });
        const location = await locationRepository.findById(id, userId);

        if (!location) throw new HttpException('Not Found Error', 404, 'Emplacement introuvable');

        const tools = await toolRepository.findByLocationId(id, userId);

        return { location, tools };
    },

    update: async (
        id: string,
        updateData: updateLocationInput,
        userId: string,
        file?: Express.Multer.File
    ): Promise<Location> => {
        validateIds({ id, userId });
        const existingLocation = await locationRepository.isExistById(id, userId);

        if (!existingLocation) throw new HttpException('Not Found Error', 404, 'Emplacement introuvable');

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
        validateIds({ id, userId });
        const existingLocation = await locationRepository.isExistById(id, userId);

        if (!existingLocation) throw new HttpException('Not Found Error', 404, 'Emplacement introuvable');

        const countTools = await locationRepository.countTools(id);

        if (countTools > 0)
            throw new HttpException(
                'Conflict Error',
                409,
                "Impossible de supprimer l'emplacement : des outils sont toujours associés à cet emplacement"
            );

        if (existingLocation.locationPublicId) {
            await cloudinaryService.deleteFile(existingLocation.locationPublicId);
        }

        await locationRepository.delete(id, userId);
    },
};
