import { RequestWithUser } from '../interfaces';
import { Request, Response, NextFunction } from 'express';

export const wrapController = (
    // La méthode de contrôleur qui attend explicitement RequestWithUser
    controllerMethod: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>
) => {
    // Retourne une fonction compatible avec Express Router qui attend Request standard
    return (req: Request, res: Response, next: NextFunction) => {
        // Cast sécurisé : on sait que req contient les propriétés de RequestWithUser
        // grâce aux middlewares d'authentification qui les ajoutent en amont
        return controllerMethod(req as RequestWithUser, res, next);
    };
};
