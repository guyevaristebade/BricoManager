import { Prisma } from '@prisma/client';

// export interface PrismaErrorResponse {
//     status: number;
//     message: string;
//     field?: string;
//     code?: string;
// }

/**
 * Gestion centralisée des erreurs Prisma
 * @param error - L'erreur Prisma capturée
 * @returns Un objet standardisé pour la réponse HTTP
 */
export const handlePrismaError = (error: any): { status: number } => {
    // 1. Erreurs connues avec codes spécifiques
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return handleKnownRequestError(error);
    }

    // 2. Erreurs de validation de schéma
    if (error instanceof Prisma.PrismaClientValidationError) {
        return {
            status: 400,
        };
    }

    // 3. Erreurs de connexion/initialisation
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return {
            status: 503,
        };
    }

    // 4. Erreurs inconnues
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {
            status: 500,
        };
    }

    // 5. Rust panic (très rare mais grave)
    if (error instanceof Prisma.PrismaClientRustPanicError) {
        return {
            status: 500,
        };
    }

    // Fallback : pas une erreur Prisma
    return {
        status: 500,
    };
};

/**
 * Gestion détaillée des erreurs connues Prisma
 */
const handleKnownRequestError = (error: Prisma.PrismaClientKnownRequestError): { status: number } => {
    const { code } = error;

    switch (code) {
        // ============================================
        // CONTRAINTES D'UNICITÉ
        // ============================================
        case 'P2002': {
            // Unique constraint violation
            // const field = (meta?.target as string[])?.join(', ') || 'champ';
            return {
                status: 409,
            };
        }

        // ============================================
        // ENREGISTREMENTS INTROUVABLES
        // ============================================
        case 'P2025': {
            // Record not found / Record to update/delete not found
            return {
                status: 404,
            };
        }

        case 'P2018': {
            // Required connected records not found
            return {
                status: 404,
            };
        }

        // ============================================
        // CONTRAINTES DE CLÉ ÉTRANGÈRE
        // ============================================
        case 'P2003': {
            // Foreign key constraint failed
            // const field = (meta?.field_name as string) || 'relation';
            return {
                status: 400,
            };
        }

        case 'P2014': {
            // Required relation violation
            return {
                status: 400,
            };
        }

        // ============================================
        // DÉPENDANCES / CASCADE
        // ============================================
        case 'P2023': {
            // Inconsistent column data
            return {
                status: 400,
            };
        }

        // ============================================
        // TIMEOUT
        // ============================================
        case 'P2024': {
            // Timed out fetching connection from pool
            return {
                status: 503,
            };
        }

        // ============================================
        // VALEURS INVALIDES
        // ============================================
        case 'P2006': {
            // Invalid value for field
            // const field = (meta?.field_name as string) || 'champ';
            return {
                status: 400,
            };
        }

        case 'P2007': {
            // Data validation error
            return {
                status: 400,
            };
        }

        // ============================================
        // AUTRES ERREURS COMMUNES
        // ============================================
        case 'P2010': {
            // Raw query failed
            return {
                status: 500,
            };
        }

        case 'P2015': {
            // Related record not found
            return {
                status: 404,
            };
        }

        case 'P2016': {
            // Query interpretation error
            return {
                status: 400,
            };
        }

        // ============================================
        // FALLBACK POUR CODES INCONNUS
        // ============================================
        default: {
            // console.error(`Code Prisma non géré: ${code}`, { meta });
            return {
                status: 500,
            };
        }
    }
};

/**
 * Vérifie si une erreur est une erreur Prisma
 */
export const isPrismaError = (error: any): boolean => {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientRustPanicError
    );
};
