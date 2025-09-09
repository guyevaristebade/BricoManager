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
    meta?: Record<string, any>;
    timestamp: string;
}

export type ApiResponse<T = any> = ResponseType<T>;

// success: boolean; // plus universel que "ok"
// status: number;   // code HTTP
// message?: string; // message lisible par un humain
// code?: string;    // code d'erreur ou de succès lisible par machine
// data?: T;         // données retournées
// meta?: Record<string, any>; // pagination, filtres appliqués, etc.
// timestamp: string; // horodatage ISO
