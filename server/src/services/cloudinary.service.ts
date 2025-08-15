import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';

export const cloudinaryService = {
    upload: async (file: Express.Multer.File, storageFileName: string): Promise<UploadApiResponse> => {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: `BricoManager/${storageFileName}`,
            quality: 'auto', // compression automatique
            fetch_format: 'auto', // convertit au format optimal selon le navigateur
            format: 'webp', // convertit l'image au format webp
        };

        try {
            const result = await cloudinary.uploader.upload(file.path, options);

            return result;
        } catch (error) {
            throw new Error('Error uploading image');
        }
    },

    delete: async (public_id: string): Promise<Boolean> => {
        try {
            await cloudinary.uploader.destroy(public_id);
            return true;
        } catch (error) {
            throw new Error('Error deleting image : ' + error);
        }
    },
};
