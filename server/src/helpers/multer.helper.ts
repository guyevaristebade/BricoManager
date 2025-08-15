// TODO étudier la configuration de miulter
import multer from 'multer';

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
        // Filtrer les types de fichiers acceptés
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});
