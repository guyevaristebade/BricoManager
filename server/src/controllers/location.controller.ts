import { locationSchema } from '../schemas';
import { locationService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const createLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const locationParsedData = locationSchema.parse(req.body);
    const file = req.file; // Assuming you're using multer for file uploads

    try {
        const apiResponse = await locationService.create(locationParsedData, file);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllLocationsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await locationService.findAll();

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const getLocationByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const apiResponse = await locationService.findById(id);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const updateLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const locationParsedData = locationSchema.parse(req.body);
    const file = req.file;

    try {
        const apiResponse = await locationService.update(id, locationParsedData, file);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const deleteLocationController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const apiResponse = await locationService.delete(id);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};
