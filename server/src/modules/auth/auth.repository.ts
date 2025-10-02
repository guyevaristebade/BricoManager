import prisma from '@config/db';
import { User } from '@prisma/client';
import { RegisterInput, loginInput } from '@modules/auth';

export const authRepository = {
    register: async (registerData: RegisterInput): Promise<User> => {
        const user = await prisma.user.create({
            data: registerData,
        });
        return user;
    },

    login: async (loginData: loginInput): Promise<User | null> => {
        const user = await prisma.user.findUnique({
            where: { email: loginData.email },
        });
        return user;
    },

    deleteRefreshToken: async (userId: string) => {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    },

    storeRefreshToken: async (userId: string, token: string | null): Promise<User> => {
        return await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: token },
        });
    },
};
