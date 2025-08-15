import { createToolSchema } from 'schemas';
import { toolService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const createToolController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const toolData = createToolSchema.parse(req.body);
        const file = req.file; // Assuming you're using multer for file uploads
        if (file) {
            const apiResponse = await toolService.create(toolData, file);
            res.status(apiResponse.status).json(apiResponse);
        }
    } catch (error) {
        next(error);
    }
};

export const getToolsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await toolService.findAll();

        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const getToolByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const apiResponse = await toolService.findById(id);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const deleteToolController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const apiResponse = await toolService.delete(id);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const updateToolController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const toolData = createToolSchema.parse(req.body);
        const file = req.file;
        const apiResponse = await toolService.update(id, toolData, file);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};
