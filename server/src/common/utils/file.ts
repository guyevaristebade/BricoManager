import fs from 'fs/promises';
import multer from 'multer';

export const cleanupFile = async (filePath: string): Promise<void> => {
    try {
        await fs.unlink(filePath);
        console.log(`✅ Fichier supprimé: ${filePath}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier temporaire
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        // Filtrer les types de fichiers acceptés && vérifier le type de fichier
        if (mimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});
