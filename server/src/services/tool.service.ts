import { prisma } from 'config';
import { toolInput } from 'schemas';
import { ApiResponse } from 'types';

export const toolService = {
    create: async (toolData: toolInput) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 201,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        const tool = await prisma.tool.create({
            data: toolData,
        });

        if (!tool) {
            throw new Error('Failed to create tool');
        }

        apiResponse.success = true;
        apiResponse.data = tool;

        return apiResponse;
    },
};
