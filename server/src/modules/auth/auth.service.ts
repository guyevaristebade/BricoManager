import { HttpException } from '@common/errors/httpException';
import { ITokens, UserPayload, loginInput, RegisterInput, authRepository } from '@modules/auth';
import { generateAccessToken, generateRefreshToken } from '@common/utils/jwt';
import { hash, compareHash } from '@common/utils/crypto';
import { profileRepository, userRepository } from '@modules/users';
import { validateIds } from '@common/utils/validateIds';

export const authService = {
    register: async (data: RegisterInput): Promise<void> => {
        const { email, name, password } = data;

        // verify if user exists
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) throw new HttpException('Conflict', 409, "Cette Email est déjà occupé par quelqu'un !");

        //hash password
        const passwordHash = await hash(password);

        // register user
        const newUser = await authRepository.register({
            email,
            name,
            password: passwordHash,
        });

        // create user profile
        await profileRepository.createProfile(newUser.id);
    },

    login: async (data: loginInput): Promise<ITokens> => {
        const { email, password } = data;

        // est-ce qu'un utilisateur existe ?
        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) throw new HttpException('Unauthorized', 401, 'Email ou mot de passe incorrecte');

        // const isEmailVerified = existingUser.isVerified;
        // if (!isEmailVerified) throw new HttpException('Forbidden', 403, "Vous n'avez pas encore validé votre adresse email");

        // comparons les mdp
        const isPasswordValid = await compareHash(password, existingUser.password);

        if (!isPasswordValid) throw new HttpException('Unauthorized', 401, 'Email ou mot de passe incorrecte');

        // extraction de certaines informations sur l'utilisateur
        const userPayload: UserPayload = {
            id: existingUser.id,
        };

        // génération des tokens
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        // mise à jour de la date de login
        await userRepository.updateLoginAt(existingUser.id);

        // hasher le refreshToken avant son stockage en base
        const hashedRefreshToken = await hash(refreshToken);

        // stockage du refreshToken en base
        await authRepository.storeRefreshToken(existingUser.id, hashedRefreshToken);

        return { refreshToken, accessToken };
    },

    refresh: async (userId: string, refreshToken: string): Promise<{ accessToken: string }> => {
        validateIds({ userId });

        const user = await userRepository.getUser(userId);
        if (!user || !user.refreshToken) throw new HttpException('Unauthorized', 401, 'Accès refusé');

        const compareTokens = await compareHash(refreshToken, user.refreshToken);
        if (!compareTokens) throw new HttpException('Unauthorized', 401, 'Accès refusé');

        const userPayload: UserPayload = {
            id: user.id,
        };

        const newAccessToken = generateAccessToken(userPayload);
        const newRefreshToken = generateRefreshToken(userPayload);

        const hashedNewRefreshToken = await hash(newRefreshToken);
        await authRepository.storeRefreshToken(userId, hashedNewRefreshToken);

        return { accessToken: newAccessToken };
    },

    logout: async (userId: string): Promise<void> => {
        validateIds({ userId });
        await authRepository.deleteRefreshToken(userId);
    },
};
