import { Router } from 'express';
import { authenticatedUser, validateWithZod } from '../middlewares';
import { locationController } from '../controllers';
import { upload } from '../helpers';
import { locationSchema } from '../schemas';

export const locationRouter = Router();

locationRouter.post(
    '/',
    authenticatedUser,
    validateWithZod(locationSchema),
    upload.single('image'),
    locationController.create
);

locationRouter.get('/', authenticatedUser, locationController.findAll);

locationRouter.get('/:id', authenticatedUser, locationController.findById);

locationRouter.patch(
    '/:id',
    authenticatedUser,
    validateWithZod(locationSchema),
    upload.single('image'),
    locationController.update
);

locationRouter.delete('/:id', authenticatedUser, locationController.delete);
