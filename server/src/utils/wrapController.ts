import { RequestWithUser } from '../interfaces';
import { Router, Request, Response, NextFunction } from 'express';

/**
 * Wrapper pour les méthodes de contrôleur qui utilisent RequestWithUser
 *
 * Problème résolu :
 * - Express utilise le type Request standard qui n'inclut pas les propriétés personnalisées
 * - Nos contrôleurs attendent RequestWithUser (qui étend Request avec des propriétés comme 'user')
 * - TypeScript génère des erreurs de type lors du routage
 */
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

/**
 * Utilisation typique :
 * router.get('/profile', authenticateToken, wrapController(getUserProfile));
 *
 * Sans ce wrapper :
 * - TypeScript se plaint que Request n'a pas les propriétés de RequestWithUser
 * - Obligation de faire le cast dans chaque contrôleur individuellement
 *
 * Avec ce wrapper :
 * - Type safety préservée
 * - Code plus propre et DRY
 * - Centralisation de la logique de cast
 */
