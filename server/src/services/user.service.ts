import { profileRepository, userRepository } from 'repositories';
import { UnauthorizedError } from '../errors';
import { removePassword } from 'utils';
import { editUserInput } from 'validators/user.schema';

export const userService = {
    getUserInfo: async (userId: string) => {
        const user = await userRepository.me(userId);
        if (!user) throw new UnauthorizedError('Accès refusé');

        const userProfile = await profileRepository.getProfile(userId);
        const userWithoutPassword = removePassword(user);

        return { user: userWithoutPassword, profile: userProfile };
    },

    editUserInfo: async (userId: string, data: editUserInput) => {
        const user = await userRepository.me(userId);
        if (!user) throw new UnauthorizedError('Accès refusé');

        const updatedUser = await userRepository.updateUserInfo(userId, data);
        return removePassword(updatedUser);
    },
};
