import { successApiResponse } from '@common/utils/apiResponse';
import { locationService } from '@modules/locations';
import { Request, NextFunction, Response } from 'express';

export const locationController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file;
            const userId = req.user!.id;
            const locationResponse = await locationService.create(userId, req.body, file);
            successApiResponse(res, {
                status: 201,
                message: 'emplacement crée avec succès',
                data: locationResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;

        try {
            const locationResponse = await locationService.findAll(userId);
            successApiResponse(res, {
                status: 200,
                message: 'Emplacements trouvés',
                data: locationResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user!.id;
            const locationResponse = await locationService.findById(id, userId);
            successApiResponse(res, {
                status: 200,
                message: 'Emplacement trouvé',
                data: locationResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user!.id;
            const file = req.file;
            const locationResponse = await locationService.update(id, req.body, userId, file);
            successApiResponse(res, {
                status: 200,
                message: 'Emplacement mis à jour ',
                data: locationResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.user!.id;
            await locationService.delete(id, userId);
            successApiResponse(res, {
                status: 200,
                message: 'Emplacement supprimé avec succès',
            });
        } catch (error) {
            next(error);
        }
    },
};
