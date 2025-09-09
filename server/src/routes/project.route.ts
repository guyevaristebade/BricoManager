import { Router } from 'express';
import { authenticatedUser } from '../middlewares/auth.middleware';
import { projectController } from '../controllers';
import { wrapController } from '../utils';
import { upload } from '../helpers';

export const projectRouter = Router();

projectRouter.get('/', authenticatedUser, wrapController(projectController.findAll));

projectRouter.get('/:id', authenticatedUser, wrapController(projectController.findById));

projectRouter.post('/', authenticatedUser, upload.single('image'), wrapController(projectController.create));

projectRouter.patch('/:id', authenticatedUser, upload.single('image'), wrapController(projectController.update));

projectRouter.put('/completed/:id', authenticatedUser, wrapController(projectController.completeProject));

projectRouter.delete('/:id', authenticatedUser, wrapController(projectController.delete));
