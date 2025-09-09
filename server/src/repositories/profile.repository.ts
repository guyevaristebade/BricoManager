import prisma from '../config/db.config';
import { UserProfile } from '@prisma/client';

export const profileRepository = {
    createProfile: async (userId: string): Promise<UserProfile> => {
        return await prisma.userProfile.create({
            data: {
                userId: userId,
            },
        });
    },

    getProfile: async (userId: string): Promise<UserProfile | null> => {
        return await prisma.userProfile.findUnique({
            where: { userId },
        });
    },
};
