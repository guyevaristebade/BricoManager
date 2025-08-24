import { ApiResponse } from '../types';
import { projectRepository } from '../repositories';
import { createProjectInput } from '@schemas/project.schema';
export const projectService = {
    create: async (userId: string, data: createProjectInput): Promise<ApiResponse> => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const project = await projectRepository.create(userId, data);

        if (!project) throw new Error('Project creation failed');

        apiResponse.success = true;
        apiResponse.status = 201;
        apiResponse.data = project;

        return apiResponse;
    },

    update: async (id: string, userId: string, data: IUpdateProject): Promise<Project | null> => {
        return await projectRepository.update(id, userId, data);
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
};
