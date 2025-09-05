import { Project } from '@prisma/client';
import { projectRepository } from '../repositories';
import { createProjectInput, updateProjectInput } from '../schemas';
import { cloudinaryService } from './cloudinary.service';
import { cleanupFile } from '../helpers';
import { ConflitError, NotFoundError } from '../errors';

export const projectService = {
    create: async (
        userId: string,
        createProjectData: createProjectInput,
        file: Express.Multer.File
    ): Promise<Project> => {
        const isExisting = await projectRepository.existingByName(createProjectData.projectName, userId);

        if (isExisting) {
            throw new ConflitError('Project with this name already exists');
        }

        let imgData;

        if (file) {
            const savedImage = await cloudinaryService.upload(file, 'project');
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
        const isExistById = await projectRepository.findById(id, userId);
        if (!isExistById) throw new NotFoundError('Project does not exist');

        let imgData;

        if (file) {
            // Upload nouvelle image
            const savedImage = await cloudinaryService.upload(file, 'project');
            await cleanupFile(file.path);

            imgData = {
                projectImgUrl: savedImage.secure_url,
                projectPublicId: savedImage.public_id,
            };
        }

        // Supprimer l'ancienne image SEULEMENT après succès du nouvel upload
        if (isExistById.projectPublicId) {
            await cloudinaryService.delete(isExistById.projectPublicId);
        }

        let project = await projectRepository.update(id, userId, updateData, imgData);

        return project;
    },

    findById: async (id: string, userId: string): Promise<Project | null> => {
        return await projectRepository.findById(id, userId);
    },

    findAll: async (userId: string): Promise<Project[]> => {
        return await projectRepository.findAll(userId);
    },

    delete: async (id: string, userId: string): Promise<Project | null> => {
        return await projectRepository.delete(id, userId);
    },

    completeProject: async (id: string, userId: string) => {
        const findProject = await projectRepository.findById(id, userId);
        if (findProject?.projectProgress != 100) throw new ConflitError('Progress must be 100% to be completed');

        if (findProject?.projectStatus == 'COMPLETED') throw new ConflitError('Project is already completed ');
        return await projectRepository.completeProject(id, userId);
    },
};
