import { ConflitError, NotFoundError, UnauthorizedError } from '../errors';
import { loginInput, RegisterInput } from '../schemas';
import { ITokens, UserPayload, UserPayloadWithTokens } from '../interfaces';
import { generateAccessToken, generateRefreshToken, storeRefreshToken, hashPassword, compareHash } from '../helpers';
import { User } from '@prisma/client';
import { authRepository, profileRepository, userRepository } from '../repositories';
import { removePassword } from 'utils';

export const authService = {
    register: async (data: RegisterInput): Promise<User> => {
        const { email, name, password } = data;

        // verify if user exists
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) throw new ConflitError('Un utilisateur existe déjà !');

        //hash password
        const passwordHash = await hashPassword(password);

        // register user
        const newUser = await authRepository.register({
            email,
            name,
            password: passwordHash,
        });

        // create user profile
        await profileRepository.createProfile(newUser.id);

        // remove password from returned user object
        const userWithoutPassword = removePassword(newUser);

        return userWithoutPassword;
    },

    login: async (data: loginInput): Promise<UserPayloadWithTokens> => {
        const { email, password } = data;

        // est-ce qu'un utilisateur existe ?
        const existingUser = await userRepository.findByEmail(email);

        if (!existingUser) throw new NotFoundError('User not found');

        // comparons les mdp
        const isPasswordValid = await compareHash(password, existingUser.password);

        if (!isPasswordValid) throw new UnauthorizedError('Invalid password');

        // extraction de certaines informations sur l'utilisateur
        const userPayload: UserPayload = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
        };

        // génération des tokens
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        // mise à jour de la date de login
        await userRepository.updateLoginAt(existingUser.id);

        // stockage du refreshToken en base
        await storeRefreshToken(existingUser.id, refreshToken);

        return { user: userPayload, refreshToken, accessToken };
    },

    refresh: async (userId: string, refreshToken: string): Promise<ITokens> => {
        if (!userId) throw new UnauthorizedError('Utilisateur invalide');

        // on vérifie que le user existe et que la valeur de refreshToken en base n'est pas null
        const user = await userRepository.findById(userId);
        if (!user || !user.refreshToken) throw new UnauthorizedError('Accès refusé');

        // on vérifie que le token en base et celui du cookie sont identique
        const compareTokens = await compareHash(refreshToken, user.refreshToken);
        if (!compareTokens) throw new UnauthorizedError('Invalid refresh token');

        const userPayload: UserPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        // on génère un newAccessToken et newRefreshToken
        const newAccessToken = generateAccessToken(userPayload);
        const newRefreshToken = generateRefreshToken(userPayload);

        // on stock le nouveau refreshToken en base pour la rotation
        await storeRefreshToken(userId, newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    },

    logout: async (userId: string): Promise<void> => {
        if (!userId) throw new UnauthorizedError('Utilisateur invalide');
        await userRepository.updateRefreshToken(userId, null);
    },
};
