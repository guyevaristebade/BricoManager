import bcrypt from 'bcryptjs';

export const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
};

export const compareHash = async (data: string, hashedData: string) => {
    return await bcrypt.compare(data, hashedData);
};
