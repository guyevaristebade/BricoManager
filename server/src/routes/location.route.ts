import { Router } from 'express';
import { authenticatedUser, validateWithZod } from '../middlewares';
import { locationController } from '../controllers';
import { upload } from '../helpers';
import { locationSchema } from '../schemas';

export const locationRouter = Router();

// le wrapper permet de gérer le typage de manière centralisée

// POST route first
locationRouter.post(
    '/',
    authenticatedUser,
    validateWithZod(locationSchema),
    upload.single('image'),
    locationController.create
);

// Parameterized routes last
locationRouter.get('/:id', authenticatedUser, locationController.findById);

locationRouter.patch('/:id', authenticatedUser, upload.single('image'), locationController.update);

locationRouter.delete('/:id', authenticatedUser, locationController.delete);

// GET all locations (specific route before parameterized routes)
locationRouter.get('/', authenticatedUser, locationController.findAll);
