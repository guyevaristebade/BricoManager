import { cloudinaryService } from '../services';
import { prisma } from '../config';
import { createToolInput, updateToolInput } from '../schemas';
import { ApiResponse } from '../types';
import { NotFoundError } from '../errors';

export const toolService = {
    create: async (toolData: createToolInput, file: Express.Multer.File) => {
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
                toolImageUrl: uploadResult.secure_url,
                toolPublicId: uploadResult.public_id,
            },
        }); // prisma lève une erreur en cas d'échec

        apiResponse.success = true;
        apiResponse.message = 'Tool created successfully';
        apiResponse.data = { tool };
        apiResponse.status = 201; // Set status to 201 for created resource

        return apiResponse;
    },

    findAll: async () => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const tools = await prisma.tool.findMany();

        apiResponse.success = true;
        apiResponse.message = 'Tools retrieved successfully';
        apiResponse.data = { tools };
        apiResponse.status = 200;

        return apiResponse;
    },

    findById: async (id: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const tool = await prisma.tool.findUnique({
            where: { id },
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

    delete: async (id: string) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        const existingTool = await prisma.tool.findUnique({
            where: { id },
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

    update: async (id: string, updateToolData: updateToolInput, file?: Express.Multer.File) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 500,
            data: null,
            timestamp: new Date().toISOString(),
        };

        let tool;
        const existingTool = await prisma.tool.findUnique({
            where: { id },
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
                    toolImageUrl: uploadResult.secure_url,
                    toolPublicId: uploadResult.public_id,
                },
            });
        } else {
            // update without image
            tool = await prisma.tool.update({
                where: { id },
                data: updateToolData,
            });
        }

        apiResponse.success = true;
        apiResponse.message = 'Tool updated successfully';
        apiResponse.data = { tool };

        return apiResponse;
    },
};
