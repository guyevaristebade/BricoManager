import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
import { getCloudinaryOptions } from '../utils';

export const cloudinaryService = {
    uploadFile: async (file: Express.Multer.File, storageFileName: string): Promise<UploadApiResponse> => {
        const options = getCloudinaryOptions(storageFileName);

        try {
            const result = await cloudinary.uploader.upload(file.path, options);

            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    deleteFile: async (public_id: string): Promise<void> => {
        try {
            await cloudinary.uploader.destroy(public_id);

            // return true;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
};
