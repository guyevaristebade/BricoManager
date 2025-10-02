import { successApiResponse } from '@common/utils/apiResponse';
import { projectService } from '@modules/projects';
import { NextFunction, Response, Request } from 'express';

export const projectController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const file = req.file!;
        try {
            const project = await projectService.create(userId, req.body, file);
            successApiResponse(res, { status: 201, message: 'Projet crée avec succès', data: project });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const id = req.params.id;
        const file = req.file;
        const body = req.body;
        try {
            const projectUpdated = await projectService.update(id, userId, body, file);
            successApiResponse(res, { status: 200, message: 'Projet mis à jour avec succès', data: projectUpdated });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        try {
            const projectResponse = await projectService.findAll(userId);
            successApiResponse(res, { status: 200, message: 'Projets récupérés avec succès', data: projectResponse });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const id = req.params.id;
        try {
            const projectResponse = await projectService.findById(id, userId);
            successApiResponse(res, { status: 200, message: 'Projet récupéré avec succès', data: projectResponse });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const id = req.params.id;
        try {
            const deleteResponse = await projectService.delete(id, userId);
            successApiResponse(res, { status: 200, message: 'Projet supprimé avec succès', data: deleteResponse });
        } catch (error) {
            next(error);
        }
    },

    completeProject: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const id = req.params.id;
        try {
            const completedResponse = await projectService.completeProject(id, userId);
            successApiResponse(res, {
                status: 200,
                message: 'Projet Terminé, Félicitations !',
                data: completedResponse,
            });
        } catch (error) {
            next(error);
        }
    },
};
