import { profileRepository, userRepository, updateUserInput } from '@modules/users';
import { removePassword } from '@common/utils/pasword';
import { HttpException } from '@common/errors/httpException';
import { validateIds } from '@common/utils/validateIds';

export const userService = {
    getUserInfo: async (userId: string) => {
        validateIds({ userId });
        const user = await userRepository.getUser(userId);
        if (!user) throw new HttpException('Unauthorized Error', 401, 'Accès refusé');

        const userProfile = await profileRepository.getProfile(userId);
        const userWithoutPassword = removePassword(user);

        return { user: userWithoutPassword, profile: userProfile };
    },

    updateUserInfo: async (userId: string, data: updateUserInput) => {
        validateIds({ userId });
        const user = await userRepository.getUser(userId);
        if (!user) throw new HttpException('Unauthorized Error', 401, 'Accès refusé');

        const updatedUser = await userRepository.updateUserInfo(userId, data);
        return removePassword(updatedUser);
    },
};
