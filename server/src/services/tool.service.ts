import { cloudinaryService } from '../services';
import prisma from '../config/db.config';
import { createToolInput, updateToolInput } from '../schemas';
import { ApiResponse } from '../types';
import { NotFoundError } from '../errors';
import { IToolQuery } from '@interfaces/tool.interface';

export const toolService = {
    create: async (toolData: createToolInput, file: Express.Multer.File, userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const uploadResult = await cloudinaryService.upload(file, 'tools');

        const tool = await prisma.tool.create({
            data: {
                ...toolData,
                userId,
                toolImageUrl: uploadResult.secure_url,
                toolPublicId: uploadResult.public_id,
            },
            include: {
                category: true,
                location: true,
            },
        }); // prisma lève une erreur en cas d'échec

        apiResponse.success = true;
        apiResponse.message = 'Tool created successfully';
        apiResponse.data = { tool };
        apiResponse.status = 201; // Set status to 201 for created resource

        return apiResponse;
    },

    findAll: async (userId: string, query?: IToolQuery) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const tools = await prisma.tool.findMany({
            where: {
                userId,
                ...query,
            },
            include: {
                category: true,
                location: true,
            },
        });

        apiResponse.success = true;
        apiResponse.message = 'Tools retrieved successfully';
        apiResponse.data = { tools };
        apiResponse.status = 200;

        return apiResponse;
    },

    findById: async (id: string, userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const tool = await prisma.tool.findUnique({
            where: { id, userId },
            include: {
                category: true,
                location: true,
            },
        });

        if (!tool) {
            throw new NotFoundError('Tool not found');
        }

        apiResponse.success = true;
        apiResponse.data = { tool };
        apiResponse.message = 'Tool retrieved successfully';
        apiResponse.status = 200;

        return apiResponse;
    },

    delete: async (id: string, userId: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingTool = await prisma.tool.findUnique({
            where: { id, userId },
            include: {
                category: true,
                location: true,
            },
        });

        if (!existingTool) throw new NotFoundError('Tool not found');

        await cloudinaryService.delete(existingTool.toolPublicId);

        await prisma.tool.delete({
            where: { id },
        });

        apiResponse.success = true;
        apiResponse.message = 'Tool deleted successfully';
        apiResponse.data = { tool: existingTool };
        apiResponse.status = 200;

        return apiResponse;
    },

    update: async (id: string, updateToolData: updateToolInput, userId: string, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        let tool;
        const existingTool = await prisma.tool.findUnique({
            where: { id },
            include: {
                category: true,
                location: true,
            },
        });

        // find tool
        if (!existingTool) throw new NotFoundError('Tool not found');

        // delete image on cloudinary with public_id in db
        if (existingTool.toolPublicId) {
            await cloudinaryService.delete(existingTool.toolPublicId);
        }

        // upload new image to cloudinary
        if (file) {
            // upload withnew image
            const uploadResult = await cloudinaryService.upload(file, 'tools');
            tool = await prisma.tool.update({
                where: { id },
                data: {
                    ...updateToolData,
                    userId,
                    toolImageUrl: uploadResult.secure_url,
                    toolPublicId: uploadResult.public_id,
                },
                include: {
                    category: true,
                    location: true,
                },
            });
        } else {
            // update without image
            tool = await prisma.tool.update({
                where: { id, userId },
                data: updateToolData,
                include: {
                    category: true,
                    location: true,
                },
            });
        }

        apiResponse.success = true;
        apiResponse.message = 'Tool updated successfully';
        apiResponse.data = { tool };

        return apiResponse;
    },
};
