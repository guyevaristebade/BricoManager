import { authMiddlewares } from '../middlewares';
import { Router } from 'express';
import {
    createToolController,
    deleteToolController,
    getToolByIdController,
    getToolsController,
    updateToolController,
} from '../controllers';
import { upload } from 'helpers';

export const toolRouter = Router();

toolRouter.get('/:id', authMiddlewares.authenticatedUser, getToolByIdController);

toolRouter.delete('/:id', authMiddlewares.authenticatedUser, deleteToolController);

toolRouter.patch('/:id', authMiddlewares.authenticatedUser, upload.single('toolImage'), updateToolController);

toolRouter.post('/', authMiddlewares.authenticatedUser, upload.single('toolImage'), createToolController);

toolRouter.get('/', authMiddlewares.authenticatedUser, getToolsController);
