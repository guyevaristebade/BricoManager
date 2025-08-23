import { Router } from 'express';
import { authMiddlewares } from '../middlewares';
import { locationController } from '../controllers';
import { upload } from '../helpers';
import { wrapController } from '../utils';
import { locationSchema } from '../schemas';

export const locationRouter = Router();

// le wrapper permet de gérer le typage de manière centralisée

// POST route first
locationRouter.post(
    '/',
    authMiddlewares.authenticatedUser,
    upload.single('locationImage'),
    wrapController(locationController.create)
);

// Parameterized routes last
locationRouter.get('/:id', authMiddlewares.authenticatedUser, wrapController(locationController.findById));

locationRouter.patch(
    '/:id',
    authMiddlewares.authenticatedUser,
    upload.single('locationImage'),
    wrapController(locationController.update)
);

locationRouter.delete('/:id', authMiddlewares.authenticatedUser, wrapController(locationController.delete));

// GET all locations (specific route before parameterized routes)
locationRouter.get('/', authMiddlewares.authenticatedUser, wrapController(locationController.findAll));
