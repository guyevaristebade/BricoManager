import { locationSchema } from '../schemas';
import { locationService } from '../services';
import { Request, NextFunction, Response } from 'express';

export const locationController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        // const locationParsedData = locationSchema.parse(req.body);
        const file = req.file;
        const userId = req.user!!.id;
        try {
            const locationResponse = await locationService.create(userId, req.body, file);

            res.status(201).json({
                success: true,
                status: 201,
                data: locationResponse,
                message: 'Location created successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;

        try {
            const locationResponse = await locationService.findAll(userId);

            res.status(200).json({
                success: true,
                status: 200,
                data: locationResponse,
                message: 'Locations retrieved successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const userId = req.user!.id;

        try {
            const locationResponse = await locationService.findById(id, userId);

            res.status(200).json({
                success: true,
                status: 200,
                data: locationResponse,
                message: 'Location retrieved successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const locationParsedData = locationSchema.parse(req.body);
            const file = req.file;
            const userId = req.user!.id;

            const apiResponse = await locationService.update(id, locationParsedData, userId, file);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user!.id;

            const apiResponse = await locationService.delete(id, userId);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
};
