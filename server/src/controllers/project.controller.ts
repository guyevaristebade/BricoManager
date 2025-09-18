import { createProjectSchema, updateProjectSchema } from '../validators';
import { RequestWithUser } from '../interfaces';
import { projectService } from '../services';
import { NextFunction, Response } from 'express';

export const projectController = {
    create: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const validatedData = createProjectSchema.parse(req.body);
        const file = req.file!;

        try {
            const project = await projectService.create(userId, validatedData, file);
            res.status(201).json({
                data: project,
                status: 201,
                message: 'Project created successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const id = req.params.id;
        const file = req.file;
        const validatedData = updateProjectSchema.parse(req.body);
        try {
            const projectUpdated = await projectService.update(id, userId, validatedData, file);
            res.status(200).json({
                data: projectUpdated,
                status: 200,
                message: 'Project updated successfully',
                timestamp: new Date().toISOString(),
            }); // répétition de code revoir
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;

        try {
            const projectResponse = await projectService.findAll(userId);
            res.status(200).json({
                data: projectResponse,
                status: 200,
                message: 'All project loaded',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const projectResponse = await projectService.findById(id, userId);
            res.status(200).json({
                data: projectResponse,
                status: 200,
                message: 'Project loaded successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const deleteResponse = await projectService.delete(id, userId);
            res.status(200).json({
                data: deleteResponse,
                status: 200,
                message: 'Project deleted successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    completeProject: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const completedResponse = await projectService.completeProject(id, userId);
            res.status(200).json({
                data: completedResponse,
                status: 200,
                message: 'Project completed successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },
};
