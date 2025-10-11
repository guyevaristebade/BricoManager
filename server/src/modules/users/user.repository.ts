import { updateUserInput } from '@modules/users';
import prisma from '@config/db';
import { User } from '@prisma/client';

export const userRepository = {
    getUser: async (userId: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    },

    findByEmail: async (email: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { email },
        });
    },

    updateLoginAt: async (userId: string) => {
        await prisma.user.update({
            where: { id: userId },
            data: { loginAt: new Date() },
        });
    },

    updateUserInfo: async (userId: string, data: updateUserInput) => {
        return await prisma.user.update({
            where: { id: userId },
            data,
        });
    },

    getUserRole: async (userId: string) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return user?.role;
    },
};
