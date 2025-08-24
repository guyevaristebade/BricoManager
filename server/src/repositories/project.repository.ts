import { ICreateProject, IUpdateProject } from '@interfaces/project.interface';
import prisma from '../config/db.config';

import { Project } from '@prisma/client';

export const projectRepository = {
    create: async (userId: string, data: ICreateProject): Promise<Project> => {
        return await prisma.project.create({
            data: {
                ...data,
                userId,
            },
        });
    },

    update: async (id: string, userId: string, data: IUpdateProject): Promise<Project> => {
        return await prisma.project.update({
            where: { id, userId },
            data,
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
};
