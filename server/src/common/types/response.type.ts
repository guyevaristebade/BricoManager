/**
 * Représente la structure standard d'une réponse pour les requêtes du serveur.
 *
 * Utilise cette interface pour uniformiser les réponses de ton API et faciliter le traitement côté client.
 */
export interface ResponseType<T> {
    success: boolean;
    status: number;
    data: T | null;
    message?: string;
    errors?: string;
    meta?: Record<string, any>;
    timestamp: string;
}

export type ApiResponse<T = any> = ResponseType<T>;
