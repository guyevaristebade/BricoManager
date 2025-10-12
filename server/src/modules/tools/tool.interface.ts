import { ToolStatus } from '@prisma/client';

export interface IToolImg {
    toolImageUrl: string;
    toolPublicId: string;
}

export interface ToolFilters {
    categoryId?: string;
    locationId?: string;
    toolStatus?: ToolStatus;
}
