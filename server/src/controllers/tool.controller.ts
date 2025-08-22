import { createToolSchema } from '../schemas';
import { toolService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const createToolController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const toolData = createToolSchema.parse(req.body);
        const file = req.file; // Assuming you're using multer for file uploads
        const userId = (req as any).user.id; // Get the user ID from the request

        if (file) {
            const apiResponse = await toolService.create(toolData, file, userId);
            res.status(apiResponse.status).json(apiResponse);
        }
    } catch (error) {
        next(error);
    }
};

export const getToolsController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id; // Get the user ID from the request
    const queries = req.query;
    try {
        const apiResponse = await toolService.findAll(userId, queries);

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const getToolByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id; // Get the user ID from the request
    try {
        const { id } = req.params;
        const apiResponse = await toolService.findById(id, userId);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const deleteToolController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id; // Get the user ID from the request
    try {
        const { id } = req.params;
        const apiResponse = await toolService.delete(id, userId);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const updateToolController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id; // Get the user ID from the request
    try {
        const { id } = req.params;
        const toolData = createToolSchema.parse(req.body);
        const file = req.file;
        const apiResponse = await toolService.update(id, toolData, userId, file);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};
