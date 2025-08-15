import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';

/**
 * APi response sample
 * {
  deleted: {
    'mon_dossier/image1': 'deleted',
    'mon_dossier/image2': 'deleted',
    'mon_dossier/image3': 'deleted'
  },
  deleted_counts: { deleted: 3, not_found: 0 }
}
 * */

// document moi la fonction
/**
 * Supprime une/plusieurs image(s) de Cloudinary
 * @param public_id Le/Les identifiant(s) public de l'image à supprimer
 * @returns La réponse de l'API Cloudinary
 */
export const deleteImageToCloudinary = async (public_id: string | string[]): Promise<UploadApiResponse> => {
    let result;
    if (Array.isArray(public_id)) {
        result = await cloudinary.api.delete_resources(public_id); // suppression de plusieurs images
    } else {
        result = await cloudinary.uploader.destroy(public_id); // supression d'une image
    }

    return result;
};

// permet de supprimer toute une ressource d'un dossier
// await cloudinary.api.delete_resources_by_prefix('mon_dossier/');
