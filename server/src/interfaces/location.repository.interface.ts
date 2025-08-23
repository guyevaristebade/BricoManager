import { Location } from '@prisma/client';

export interface CreateLocationData {
    locationName: string;
    locationImgUrl?: string;
    locationPublicId?: string;
    userId: string;
}

export interface UpdateLocationData {
    locationName?: string;
    locationImgUrl?: string;
    locationPublicId?: string;
}

// export interface ILocationRepository {
//     findAll(filters: LocationFilters): Promise<Location[]>;
//     findById(id: string, userId: string): Promise<Location | null>;
//     create(data: CreateLocationData): Promise<Location>;
//     update(id: string, userId: string, data: UpdateLocationData): Promise<Location>;
//     delete(id: string, userId: string): Promise<void>;
//     existsById(id: string, userId: string): Promise<boolean>;
// }
