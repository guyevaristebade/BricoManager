import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';
import { Router } from 'express';
import { createLocationSchema, locationController, updateLocationSchema } from '@modules/locations';
import { upload } from '@common/utils/file';

export const locationRouter = Router();

locationRouter.post(
    '/',
    authenticatedUser,
    zodValidator(createLocationSchema),
    upload.single('image'),
    locationController.create
);

locationRouter.get('/', authenticatedUser, locationController.findAll);

locationRouter.get('/:id', authenticatedUser, locationController.findById);

locationRouter.patch(
    '/:id',
    authenticatedUser,
    zodValidator(updateLocationSchema),
    upload.single('image'),
    locationController.update
);

locationRouter.delete('/:id', authenticatedUser, locationController.delete);
