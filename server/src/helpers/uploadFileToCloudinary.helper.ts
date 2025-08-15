import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
export const uploadFileToCloudinary = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'BricoManager',
    };

    const result = await cloudinary.uploader.upload(file.path, options);

    return result;
};
