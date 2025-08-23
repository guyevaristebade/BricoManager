import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
import { cleanupFile } from '../helpers';

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
            width: 600,
            height: 600,
            crop: 'limit',
        };

        try {
            const result = await cloudinary.uploader.upload(file.path, options);

            if (result) {
                await cleanupFile(file.path);
            }

            return result;
        } catch (error) {
            // console.error('Error uploading image to Cloudinary:', error);
            throw new Error('Error uploading image');
        }
    },

    delete: async (public_id: string): Promise<Boolean> => {
        try {
            await cloudinary.uploader.destroy(public_id);

            return true;
        } catch (error) {
            // console.log('Error deleting image from Cloudinary:', error);
            throw new Error('Error deleting image : ' + error);
        }
    },
};
