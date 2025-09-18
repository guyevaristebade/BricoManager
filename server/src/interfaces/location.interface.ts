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

export interface LocationImgData {
    locationImgUrl: string;
    locationPublicId: string;
}
