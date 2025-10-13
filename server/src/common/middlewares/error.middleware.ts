import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorApiResponse } from '@common/utils/apiResponse';
import { handlePrismaError, isPrismaError } from '@common/utils/prisma';
import { randomUUID } from 'crypto';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Générer un ID unique pour tracer l'erreur
    const errorId = randomUUID();

    // écrire les logs dans un fichier plus tard (winston, pino, etc.)
    // Log complet côté serveur (avec contexte)
    console.error(`[Error ID: ${errorId}]`, {
        message: err?.message,
        name: err?.name,
        stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
        path: req.originalUrl,
        method: req.method,
        userId: req.user?.id,
        timestamp: new Date().toISOString(),
    });

    // ============================================
    // 1. ERREURS DE VALIDATION ZOD
    // ============================================
    if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        errorApiResponse(res, {
            status: 400,
            message: 'Données invalides',
            errors,
            path: req.originalUrl,
            meta: { errorId },
        });
    }

    // ============================================
    // 2. ERREURS PRISMA
    // ============================================
    if (isPrismaError(err)) {
        const prismaError = handlePrismaError(err);

        errorApiResponse(res, {
            status: prismaError.status,
            message: 'Erreur base de données',
            path: req.originalUrl,
            meta: {
                errorId,
            },
        });
    }

    // ============================================
    // 3. ERREURS SERVEUR (FALLBACK)
    // ============================================
    errorApiResponse(res, {
        status: 500,
        message:
            process.env.NODE_ENV === 'development'
                ? err?.message || 'Erreur interne du serveur'
                : 'Erreur interne du serveur',
        path: req.originalUrl,
        meta: { errorId },
    });
};
