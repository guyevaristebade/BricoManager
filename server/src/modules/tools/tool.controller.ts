import { successApiResponse } from '@common/utils';
import { toolService } from '@modules/tools';
import { NextFunction, Response, Request } from 'express';

export const toolController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const file = req.file!;
            const createToolResponse = await toolService.create(userId, req.body, file);
            successApiResponse(res, { status: 201, message: 'Outil crée avec succès', data: createToolResponse });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const tools = await toolService.findAll(userId);
            successApiResponse(res, { status: 200, message: 'Outils récupérés avec succès', data: tools });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const toolId = req.params.id;
            const tool = await toolService.findById(toolId, userId);
            successApiResponse(res, { status: 200, message: 'Outil récupéré avec succès', data: tool });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const toolId = req.params.id;
            const file = req.file;
            const updateToolResponse = await toolService.update(toolId, req.body, userId, file);
            successApiResponse(res, { status: 200, message: 'Outil mis à jour avec succès', data: updateToolResponse });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const toolId = req.params.id;
            await toolService.delete(toolId, userId);
            successApiResponse(res, { status: 200, message: 'Outil supprimé avec succès' });
        } catch (error) {
            next(error);
        }
    },

    findByLocationId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const locationId = req.params.id;
            const tools = await toolService.findByLocationId(locationId, userId);
            successApiResponse(res, { status: 200, message: 'Outils trouvés', data: tools });
        } catch (error) {
            next(error);
        }
    },
};
