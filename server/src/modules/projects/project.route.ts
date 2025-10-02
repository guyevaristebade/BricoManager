import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { Router } from 'express';
import { createProjectSchema, projectController, updateProjectSchema } from '@modules/projects';
import { upload } from '@common/utils/file';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';

export const projectRouter = Router();

projectRouter.get('/', authenticatedUser, projectController.findAll);

projectRouter.get('/:id', authenticatedUser, projectController.findById);

projectRouter.post(
    '/',
    authenticatedUser,
    upload.single('image'),
    zodValidator(createProjectSchema),
    projectController.create
);

projectRouter.patch(
    '/:id',
    authenticatedUser,
    upload.single('image'),
    zodValidator(updateProjectSchema),
    projectController.update
);

projectRouter.put('/completed/:id', authenticatedUser, projectController.completeProject);

projectRouter.delete('/:id', authenticatedUser, projectController.delete);
