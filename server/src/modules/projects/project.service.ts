import { Project } from '@prisma/client';
import { createProjectInput, projectRepository, updateProjectInput } from '@modules/projects';
import { HttpException } from '@common/errors/httpException';
import { cloudinaryService } from '@common/services/cloudinary.service';
import { cleanupFile } from '@common/utils/file';
import { validateIds } from '@common/utils/validateIds';

export const projectService = {
    create: async (
        userId: string,
        createProjectData: createProjectInput,
        file: Express.Multer.File
    ): Promise<Project> => {
        validateIds({ userId });
        const isExisting = await projectRepository.existingByName(createProjectData.projectName, userId);

        if (isExisting) {
            throw new HttpException('Conflict Error', 409, 'Un projet avec ce nom existe déjà');
        }

        let imgData;

        if (file) {
            const savedImage = await cloudinaryService.uploadFile(file, 'project');
            imgData = {
                projectImgUrl: savedImage.secure_url,
                projectPublicId: savedImage.public_id,
            };

            // Cleanup temporary file
            await cleanupFile(file.path);
        }

        const project = await projectRepository.create(userId, createProjectData, imgData);

        return project;
    },

    update: async (
        id: string,
        userId: string,
        updateData: updateProjectInput,
        file?: Express.Multer.File
    ): Promise<Project> => {
        // Vérifier si le projet existe
        validateIds({ id, userId });
        const isExistById = await projectRepository.findById(id, userId);
        if (!isExistById) throw new HttpException('Not Found Error', 404, 'Projet introuvable');

        let imgData;

        if (file) {
            // Upload nouvelle image
            const savedImage = await cloudinaryService.uploadFile(file, 'project');
            await cleanupFile(file.path);

            imgData = {
                projectImgUrl: savedImage.secure_url,
                projectPublicId: savedImage.public_id,
            };
        }

        // Supprimer l'ancienne image SEULEMENT après succès du nouvel upload
        if (isExistById.projectPublicId) {
            await cloudinaryService.deleteFile(isExistById.projectPublicId);
        }

        let project = await projectRepository.update(id, userId, updateData, imgData);

        return project;
    },

    findById: async (id: string, userId: string): Promise<Project | null> => {
        validateIds({ id, userId });
        return await projectRepository.findById(id, userId);
    },

    findAll: async (userId: string): Promise<Project[]> => {
        validateIds({ userId });
        return await projectRepository.findAll(userId);
    },

    delete: async (id: string, userId: string): Promise<Project | null> => {
        validateIds({ id, userId });
        const existingProject = await projectRepository.findById(id, userId);
        if (!existingProject) throw new HttpException('Not Found Error', 404, 'Projet introuvable');

        if (existingProject.projectPublicId) {
            await cloudinaryService.deleteFile(existingProject.projectPublicId);
        }
        return await projectRepository.delete(id, userId);
    },

    completeProject: async (id: string, userId: string) => {
        validateIds({ id, userId });
        const findProject = await projectRepository.findById(id, userId);
        if (findProject?.projectProgress != 100)
            throw new HttpException('Bad Request', 400, "Le projet n'est pas encore terminé à 100%");

        if (findProject?.projectStatus == 'COMPLETED')
            throw new HttpException('Conflict Error', 409, 'Le projet est déjà terminé');
        return await projectRepository.completeProject(id, userId);
    },
};
