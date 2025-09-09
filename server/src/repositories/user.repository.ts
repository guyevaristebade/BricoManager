import { editUserInput } from 'schemas/user.schema';
import prisma from '../config/db.config';
import { User } from '@prisma/client';

export const userRepository = {
    me: async (userId: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    },

    findByEmail: async (email: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { email },
        });
    },

    updateRefreshToken: async (userId: string, token: string | null): Promise<User> => {
        return await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: token },
        });
    },

    updateLoginAt: async (userId: string) => {
        await prisma.user.update({
            where: { id: userId },
            data: { loginAt: new Date() },
        });
    },

    updateUserInfo: async (userId: string, data: editUserInput) => {
        return await prisma.user.update({
            where: { id: userId },
            data,
        });
    },
};
