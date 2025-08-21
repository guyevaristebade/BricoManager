import prisma from '../config/db.config';

export const updateLoginAt = async (userId: string) => {
    await prisma.user.update({
        where: { id: userId },
        data: { loginAt: new Date() },
    });
};
