import { cloudinaryService } from '../services';
import { createToolInput, updateToolInput } from '../schemas';
import { ConflitError, NotFoundError } from '../errors';
import { toolRepository } from '../repositories';
import { IToolImg } from '@interfaces/tool.interface';
import { Tool } from '@prisma/client';
import { cleanupFile } from '@helpers/cleanupFile.helper';

export const toolService = {
    create: async (userId: string, toolData: createToolInput, file: Express.Multer.File): Promise<Tool> => {
        const isExist = await toolRepository.isExistByName(userId, toolData.toolName);
        if (isExist) throw new ConflitError('a tool with this name already exist');

        const savedImage = await cloudinaryService.upload(file, 'tools');
        await cleanupFile(file.path);
        const imgData: IToolImg = {
            toolImageUrl: savedImage.secure_url,
            toolPublicId: savedImage.public_id,
        };

        return await toolRepository.create(userId, toolData, imgData);
    },

    findAll: async (userId: string) => {
        return await toolRepository.findAll(userId);
    },

    findById: async (id: string, userId: string): Promise<Tool | null> => {
        return await toolRepository.findById(id, userId);
    },

    delete: async (id: string, userId: string): Promise<Tool | null> => {
        const existingTool = await toolRepository.findById(id, userId);
        if (!existingTool) throw new NotFoundError('Tool not found');

        await cloudinaryService.delete(existingTool.toolPublicId);
        return await toolRepository.delete(id, userId);
    },

    update: async (id: string, updateToolData: updateToolInput, userId: string, file?: Express.Multer.File) => {
        let imgData;
        const existingTool = await toolRepository.findById(id, userId);

        // find tool
        if (!existingTool) throw new NotFoundError('Tool not found');

        if (file) {
            // delete image on cloudinary with public_id in db
            if (existingTool.toolPublicId) {
                await cloudinaryService.delete(existingTool.toolPublicId);
            }

            // upload withnew image
            const savedImage = await cloudinaryService.upload(file, 'tools');

            await cleanupFile(file.path);

            imgData = {
                toolImageUrl: savedImage.secure_url,
                toolPublicId: savedImage.public_id,
            };
        }

        return await toolRepository.update(id, userId, updateToolData, imgData);
    },
};
