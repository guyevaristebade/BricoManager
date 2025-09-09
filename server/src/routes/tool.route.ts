import { Router } from 'express';
import { authenticatedUser } from '../middlewares';
import { toolCOntroller } from '../controllers';
import { upload } from '../helpers';
import { wrapController } from 'utils';

export const toolRouter = Router();

toolRouter.post('/', authenticatedUser, upload.single('image'), wrapController(toolCOntroller.create));

toolRouter.get('/', authenticatedUser, wrapController(toolCOntroller.findAll));

toolRouter.get('/:id', authenticatedUser, wrapController(toolCOntroller.findById));

toolRouter.delete('/:id', authenticatedUser, wrapController(toolCOntroller.delete));

toolRouter.patch('/:id', authenticatedUser, upload.single('image'), wrapController(toolCOntroller.update));
