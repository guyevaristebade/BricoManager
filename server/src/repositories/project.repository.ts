import { Project } from '@prisma/client';
import prisma from '../config/db.config';
import { createProjectInput, updateProjectInput } from '../validators';
import { IProjectData } from '../interfaces';

export const projectRepository = {
    create: async (userId: string, data: createProjectInput, imgData?: IProjectData): Promise<Project> => {
        return await prisma.project.create({
            data: {
                ...data,
                userId,
                projectImgUrl: imgData?.projectImgUrl,
                projectPublicId: imgData?.projectPublicId,
            },
        });
    },

    update: async (id: string, userId: string, data: updateProjectInput, imgData?: IProjectData): Promise<Project> => {
        return await prisma.project.update({
            where: { id, userId },
            data: {
                ...data,
                projectImgUrl: imgData?.projectImgUrl,
                projectPublicId: imgData?.projectPublicId,
            },
        });
    },

    findById: async (id: string, userId: string): Promise<Project | null> => {
        return await prisma.project.findUnique({
            where: { id, userId },
        });
    },
    findAll: async (userId: string): Promise<Project[]> => {
        return await prisma.project.findMany({
            where: { userId },
        });
    },

    delete: async (id: string, userId: string): Promise<Project | null> => {
        return await prisma.project.delete({
            where: { id, userId },
        });
    },

    existingByName: async (name: string, userId: string): Promise<boolean> => {
        const project = await prisma.project.findFirst({
            where: { projectName: name, userId },
        });
        return project !== null;
    },

    completeProject: async (id: string, userId: string): Promise<Project> => {
        return await prisma.project.update({
            where: { id, userId },
            data: {
                projectStatus: 'COMPLETED',
            },
        });
    },
};
