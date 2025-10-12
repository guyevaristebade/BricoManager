import { Router } from 'express';
import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { createToolSchema, toolController, updateToolSchema } from '@modules/tools';
import { upload } from '@common/utils/file';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';
import { updateLocationSchema } from '@modules/locations';

export const toolRouter = Router();

toolRouter.post('/', authenticatedUser, upload.single('image'), zodValidator(createToolSchema), toolController.create);

toolRouter.get('/', authenticatedUser, toolController.findAll);

toolRouter.get('/:id', authenticatedUser, toolController.findById);

toolRouter.delete('/:id', authenticatedUser, toolController.delete);

toolRouter.patch(
    '/:id',
    authenticatedUser,
    upload.single('image'),
    zodValidator(updateToolSchema),
    toolController.update
);
