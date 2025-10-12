import { Tool } from '@prisma/client';
import { IToolImg, ToolFilters } from './tool.interface';
import { cleanupFile } from '@common/utils/file';
import { HttpException } from '@common/errors/httpException';
import { cloudinaryService } from '@common/services/cloudinary.service';
import { toolRepository, createToolInput, updateToolInput } from '@modules/tools';
import { validateIds } from '@common/utils/validateIds';

export const toolService = {
    create: async (userId: string, toolData: createToolInput, file: Express.Multer.File): Promise<Tool> => {
        validateIds({ userId });
        if (!file) throw new HttpException('Bad Request Error', 400, "L'outil doit avoir une image");
        const isExist = await toolRepository.isExistByName(userId, toolData.toolName);
        if (isExist) throw new HttpException('Conflit Error', 409, 'Un outil existe déjà !');

        const savedImage = await cloudinaryService.uploadFile(file, 'tools');

        await cleanupFile(file.path);

        const imgData: IToolImg = {
            toolImageUrl: savedImage.secure_url,
            toolPublicId: savedImage.public_id,
        };

        return await toolRepository.create(userId, toolData, imgData);
    },

    findAll: async (userId: string, filters: ToolFilters): Promise<Tool[]> => {
        validateIds({ userId });
        return await toolRepository.findAll(userId, filters);
    },

    // findAllWithDetails: async (userId: string): Promise<Tool[]> => {
    //     validateIds({ userId });
    //     return await toolRepository.findAllWithDetails(userId);
    // },

    findById: async (id: string, userId: string): Promise<Tool | null> => {
        validateIds({ id, userId });
        return await toolRepository.findById(id, userId);
    },

    delete: async (id: string, userId: string): Promise<void> => {
        validateIds({ id, userId });
        const existingTool = await toolRepository.findById(id, userId);
        if (!existingTool) throw new HttpException('Not Found Error', 404, 'Outil introuvable');

        await cloudinaryService.deleteFile(existingTool.toolPublicId);
        await toolRepository.delete(id, userId);
    },

    update: async (
        id: string,
        updateToolData: updateToolInput,
        userId: string,
        file?: Express.Multer.File
    ): Promise<Tool> => {
        validateIds({ id, userId });
        let imgData;
        const existingTool = await toolRepository.findById(id, userId);

        if (!existingTool) throw new HttpException('Not Found Error', 404, 'Outil introuvable');

        if (file) {
            if (existingTool.toolPublicId) {
                await cloudinaryService.deleteFile(existingTool.toolPublicId);
            }

            const savedImage = await cloudinaryService.uploadFile(file, 'tools');

            await cleanupFile(file.path);

            imgData = {
                toolImageUrl: savedImage.secure_url,
                toolPublicId: savedImage.public_id,
            };
        }

        return await toolRepository.update(id, userId, updateToolData, imgData);
    },

    findByLocationId: async (id: string, userId: string): Promise<Tool[]> => {
        validateIds({ id, userId });
        return await toolRepository.findByLocationId(id, userId);
    },
};
