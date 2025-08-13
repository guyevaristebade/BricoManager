import { toolSchema } from 'schemas';
import { toolService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const createToolController = async (req: Request, res: Response, next: NextFunction) => {
    // const toolParsedData = toolSchema.parse(req.body);

    // try {
    //     const apiResponse = await toolService.create(toolParsedData);
    //     res.status(apiResponse.status).json(apiResponse);
    // } catch (error) {
    //     next(error);
    // }
    // Express.Multer.File[]
    if (req.files) {
        res.send(req.files);
    }
};
