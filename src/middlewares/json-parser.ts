import { Request, Response, NextFunction } from 'express';
import { json } from 'express';

export const jsonParserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return json()(req, res, next);
}