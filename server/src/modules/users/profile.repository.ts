import prisma from '@config/db';
import { IProfileImg, updateProfileInput } from '@modules/users';
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

    updateProfile: async (userId: string, data: updateProfileInput, profileImg?: IProfileImg): Promise<UserProfile> => {
        return await prisma.userProfile.update({
            where: { userId },
            data: {
                ...data,
                public_id: profileImg?.public_id,
                avatarUrl: profileImg?.avatarUrl,
            },
        });
    },
};
