import { authMiddlewares } from '../middlewares';
import { Router } from 'express';
import {
    getLocationByIdController,
    updateLocationController,
    deleteLocationController,
    createLocationController,
    getAllLocationsController,
} from '../controllers';
import { upload } from 'helpers';

export const locationRouter = Router();

locationRouter.get('/:id', authMiddlewares.authenticatedUser, getLocationByIdController);

locationRouter.delete('/:id', authMiddlewares.authenticatedUser, deleteLocationController);

locationRouter.patch(
    '/:id',
    authMiddlewares.authenticatedUser,
    upload.single('locationImage'),
    updateLocationController
);

locationRouter.post('/', authMiddlewares.authenticatedUser, upload.single('locationImage'), createLocationController);

locationRouter.get('/', authMiddlewares.authenticatedUser, getAllLocationsController);
