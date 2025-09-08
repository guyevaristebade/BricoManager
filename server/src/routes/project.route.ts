import { Router } from 'express';
import { authMiddlewares } from '../middlewares/auth.middleware';
import { projectController } from '../controllers';
import { wrapController } from '../utils';
import { upload } from '../helpers';

export const projectRouter = Router();

projectRouter.get('/', authMiddlewares.authenticatedUser, wrapController(projectController.findAll));

projectRouter.get('/:id', authMiddlewares.authenticatedUser, wrapController(projectController.findById));

projectRouter.post(
    '/',
    authMiddlewares.authenticatedUser,
    upload.single('image'),
    wrapController(projectController.create)
);

projectRouter.patch(
    '/:id',
    authMiddlewares.authenticatedUser,
    upload.single('image'),
    wrapController(projectController.update)
);

projectRouter.put(
    '/completed/:id',
    authMiddlewares.authenticatedUser,
    wrapController(projectController.completeProject)
);

projectRouter.delete('/:id', authMiddlewares.authenticatedUser, wrapController(projectController.delete));
