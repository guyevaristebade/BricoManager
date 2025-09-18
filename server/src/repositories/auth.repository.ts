import { User } from '@prisma/client';
import { RegisterInput, loginInput } from '../validators';
import prisma from '../config/db.config';

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
};
