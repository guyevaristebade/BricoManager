import { prisma } from '../config';
import { toolInput } from '../schemas';
import { ApiResponse } from '../types';

export const toolService = {
    create: async (toolData: toolInput) => {
        const apiResponse: ApiResponse = {
            success: false,
            status: 201,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        const tool = await prisma.tool.create({
            data: {
                toolName: toolData.toolName,
                toolCategoryId: toolData.toolCategoryId,
                toolStatus: 'AVAILABLE',
                nbLoaning: toolData.nbLoaning,
                toolPrice: toolData.toolPrice,
                locationId: toolData.locationId,
                toolDescription: toolData.toolDescription,
            },
        });

        //     toolName: string;
        // toolCategory: string;
        // toolStatus: "AVAILABLE" | "LOANED" | "BROKEN" | "LOST";
        // toolPrice: number;
        // locationId: string;
        // toolDescription: string;

        if (!tool) {
            throw new Error('Failed to create tool');
        }

        apiResponse.success = true;
        apiResponse.data = tool;

        return apiResponse;
    },
};
