import fs from 'fs/promises';

export const cleanupFile = async (filePath: string): Promise<void> => {
    try {
        await fs.unlink(filePath);
        console.log(`✅ Fichier supprimé: ${filePath}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
