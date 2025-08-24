import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
import { cleanupFile } from '../helpers';
import { getCloudinaryOptions } from '../utils';

export const cloudinaryService = {
    upload: async (file: Express.Multer.File, storageFileName: string): Promise<UploadApiResponse> => {
        const options = getCloudinaryOptions(storageFileName);

        try {
            const result = await cloudinary.uploader.upload(file.path, options);

            // changer l'emplacement de code
            if (result) {
                await cleanupFile(file.path);
            }

            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    uploadMultiple: async (files: Express.Multer.File[], storageFileName: string): Promise<UploadApiResponse[]> => {
        const options = getCloudinaryOptions(storageFileName);

        try {
            const results = await Promise.all(files.map((file) => cloudinary.uploader.upload(file.path, options)));

            // changer la place de ce code
            await Promise.all(files.map((file) => cleanupFile(file.path)));

            return results;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    delete: async (public_id: string): Promise<Boolean> => {
        try {
            await cloudinary.uploader.destroy(public_id);

            return true;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    deleteMultiple: async (public_ids: string[]): Promise<Boolean[]> => {
        try {
            const results = await Promise.all(public_ids.map((id) => cloudinary.uploader.destroy(id)));
            return results;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
};
