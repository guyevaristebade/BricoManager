import { ResponseType } from '../interfaces';
// alias de type pour une réponse générique

export type ApiResponse<T = any> = ResponseType<T>;

// success: boolean; // plus universel que "ok"
// status: number;   // code HTTP
// message?: string; // message lisible par un humain
// code?: string;    // code d'erreur ou de succès lisible par machine
// data?: T;         // données retournées
// meta?: Record<string, any>; // pagination, filtres appliqués, etc.
// timestamp: string; // horodatage ISO
