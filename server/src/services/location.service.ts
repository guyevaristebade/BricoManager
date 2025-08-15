import { locationInput } from '../schemas/location.schema';
import { prisma } from '../config';
import { ApiResponse } from '../types';
import { NotFoundError } from 'errors/not-found.error';
import { cloudinaryService } from './cloudinary.service';

export const locationService = {
    create: async (locationData: locationInput, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        let location;

        if (file) {
            // upload location image on cloudinary
            const savedImage = await cloudinaryService.upload(file, 'location');
            location = await prisma.location.create({
                data: {
                    ...locationData,
                    locationImgUrl: savedImage.secure_url,
                    locationPublicId: savedImage.public_id,
                },
            });
        } else {
            location = await prisma.location.create({
                data: locationData,
            });
        }

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 201;
        apiResponse.message = 'Location created successfully';

        return apiResponse;
    },

    findAll: async () => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const locations = await prisma.location.findMany();

        apiResponse.data = locations;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Locations retrieved successfully';

        return apiResponse;
    },

    findById: async (id: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const location = await prisma.location.findUnique({
            where: { id },
        });

        if (!location) throw new NotFoundError('Location not found');

        apiResponse.data = location;
        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location retrieved successfully';

        return apiResponse;
    },

    update: async (id: string, locationData: locationInput, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await prisma.location.findUnique({
            where: { id },
        });

        if (!existingLocation) throw new NotFoundError('Location not found');

        await cloudinaryService.delete(existingLocation.locationPublicId!); // locationPublicId is present

        let location;

        // save new image if exists
        if (file) {
            const savedImage = await cloudinaryService.upload(file, 'location');
            location = await prisma.location.update({
                where: { id },
                data: {
                    ...locationData,
                    locationImgUrl: savedImage.secure_url,
                    locationPublicId: savedImage.public_id,
                },
            });
        } else {
            location = await prisma.location.update({
                where: { id },
                data: locationData,
            });
        }

        apiResponse.data = location;

        return apiResponse;
    },

    delete: async (id: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingLocation = await prisma.location.findUnique({
            where: { id },
        });

        if (!existingLocation) throw new NotFoundError('Location not found');

        const toolsInThisLocation = await prisma.tool.findMany({
            where: { locationId: id },
        });

        if (toolsInThisLocation.length > 0)
            throw new Error('Cannot delete location: tools are still associated with this location');

        await prisma.location.delete({
            where: { id },
        });

        apiResponse.success = true;
        apiResponse.status = 200;
        apiResponse.message = 'Location deleted successfully';

        return apiResponse;
    },
};
