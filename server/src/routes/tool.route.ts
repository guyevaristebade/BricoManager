import { Router } from 'express';
import { authenticatedUser } from '../middlewares';
import { toolController } from '../controllers';
import { upload } from '../helpers';

export const toolRouter = Router();

toolRouter.post('/', authenticatedUser, upload.single('image'), toolController.create);

toolRouter.get('/', authenticatedUser, toolController.findAll);

toolRouter.get('/:id', authenticatedUser, toolController.findById);

toolRouter.delete('/:id', authenticatedUser, toolController.delete);

toolRouter.patch('/:id', authenticatedUser, upload.single('image'), toolController.update);
