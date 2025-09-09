import prisma from '../config/db.config';
import { UnauthorizedError } from '../errors';
import { UserInfos } from '../interfaces';
import { ApiResponse } from '../interfaces';

export const userService = {
    find: async (userId: string) => {
        const apiResponse: ApiResponse<UserInfos> = {
            success: true,
            status: 200,
            data: null,
            timestamp: Date.now().toLocaleString(),
        };

        if (!userId) throw new UnauthorizedError('Utilisateur invalide');

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                role: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                loginAt: true,
            },
        });

        if (!user) throw new UnauthorizedError('Accès refusé');

        apiResponse.data = user;

        return apiResponse;
    },
};
