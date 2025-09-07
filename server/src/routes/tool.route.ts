import { Router } from 'express';
import { authMiddlewares } from '../middlewares';
import { toolCOntroller } from '../controllers';
import { upload } from '../helpers';
import { wrapController } from 'utils';

export const toolRouter = Router();

toolRouter.post('/', authMiddlewares.authenticatedUser, upload.single('image'), wrapController(toolCOntroller.create));

toolRouter.get('/', authMiddlewares.authenticatedUser, wrapController(toolCOntroller.findAll));

toolRouter.get('/:id', authMiddlewares.authenticatedUser, wrapController(toolCOntroller.findById));

toolRouter.delete('/:id', authMiddlewares.authenticatedUser, wrapController(toolCOntroller.delete));

toolRouter.patch(
    '/:id',
    authMiddlewares.authenticatedUser,
    upload.single('image'),
    wrapController(toolCOntroller.update)
);

// toolRouter.delete('/:id', authMiddlewares.authenticatedUser, deleteToolController);

// toolRouter.patch('/:id', authMiddlewares.authenticatedUser, upload.single('toolImage'), updateToolController);

// toolRouter.post('/', authMiddlewares.authenticatedUser, upload.single('toolImage'), createToolController);

// toolRouter.get('/', authMiddlewares.authenticatedUser, getToolsController);
