import { locationSchema } from '../schemas';
import { locationService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const createLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const locationParsedData = locationSchema.parse(req.body);
    const file = req.file; // Assuming you're using multer for file uploads
    const userId = (req as any).user.id; // Get the user ID from the request

    try {
        const apiResponse = await locationService.create(locationParsedData, userId, file);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const getAllLocationsController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id; // Get the user ID from the request

    try {
        const apiResponse = await locationService.findAll(userId);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const getLocationByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id; // Get the user ID from the request

    try {
        const apiResponse = await locationService.findById(id, userId);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const updateLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id; // Get the user ID from the request
    const locationParsedData = locationSchema.parse(req.body);
    const file = req.file;

    try {
        const apiResponse = await locationService.update(id, locationParsedData, userId, file);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const deleteLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id; // Get the user ID from the request

    try {
        const apiResponse = await locationService.delete(id, userId);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};
