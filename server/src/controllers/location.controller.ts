import { RequestWithUser } from '../interfaces';
import { locationSchema } from '../schemas';
import { locationService } from '../services';
import { NextFunction, Response } from 'express';

export const locationController = {
    create: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const locationParsedData = locationSchema.parse(req.body);
            const file = req.file;
            const userId = req.user.id;

            const apiResponse = await locationService.create(locationParsedData, userId, file);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;

            const apiResponse = await locationService.findAll(userId);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const apiResponse = await locationService.findById(id, userId);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const locationParsedData = locationSchema.parse(req.body);
            const file = req.file;
            const userId = req.user.id;

            const apiResponse = await locationService.update(id, locationParsedData, userId, file);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const apiResponse = await locationService.delete(id, userId);

            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
};
