import { authMiddlewares } from '../middlewares';
import { Router } from 'express';
import { createToolController } from '../controllers';
import { upload } from 'helpers';

export const toolRouter = Router();

toolRouter.post('/', authMiddlewares.authenticatedUser, upload.single('toolImage'), createToolController);
