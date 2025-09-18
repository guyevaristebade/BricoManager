import { createToolSchema, updateToolSchema } from '../validators';
import { toolService } from '../services';
import { NextFunction, Response, Request } from 'express';

export const toolController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const validateData = createToolSchema.parse(req.body);
        const file = req.file;
        try {
            const createToolResponse = await toolService.create(userId, validateData, file!);
            res.status(201).json({
                success: true,
                status: 201,
                data: createToolResponse,
                message: 'Tool created successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        try {
            const tools = await toolService.findAll(userId);
            res.status(200).json({
                success: true,
                status: 200,
                data: tools,
                message: 'Tools retrieved successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const toolId = req.params.id;
        try {
            const tool = await toolService.findById(toolId, userId);
            res.status(200).json({
                success: true,
                status: 200,
                data: tool,
                message: 'Tool retrieved successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const toolId = req.params.id;
        try {
            const deleteToolResponse = await toolService.delete(toolId, userId);
            res.status(200).json({
                success: true,
                status: 200,
                data: deleteToolResponse,
                message: 'Tool deleted successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const toolId = req.params.id;
        const validateData = updateToolSchema.parse(req.body); // updateToolSchema.partial().parse(req.body); partial pour rendre tous les champs optionnels
        const file = req.file;
        try {
            const updateToolResponse = await toolService.update(toolId, validateData, userId, file);
            res.status(200).json({
                success: true,
                status: 200,
                data: updateToolResponse,
                message: 'Tool updated successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },
};
