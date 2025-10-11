import { UploadApiResponse } from 'cloudinary';
import cloudinary from '@config/cloudinarySetup';
import { getCloudinaryOptions } from '@common/utils/getCloudinaryOptions';
import { HttpException } from '@common/errors/httpException';

export const cloudinaryService = {
    uploadFile: async (file: Express.Multer.File, storageFileName: string): Promise<UploadApiResponse> => {
        const options = getCloudinaryOptions(storageFileName);

        try {
            const result = await cloudinary.uploader.upload(file.path, options);

            return result;
        } catch (error) {
            throw new HttpException('Cloudinary Error', 500, "Echec du téléchargement de l'image");
        }
    },

    deleteFile: async (public_id: string): Promise<void> => {
        try {
            await cloudinary.uploader.destroy(public_id);
        } catch (error) {
            throw new HttpException('Cloudinary Error', 500, "Echec de suppression de l'image");
        }
    },
};
