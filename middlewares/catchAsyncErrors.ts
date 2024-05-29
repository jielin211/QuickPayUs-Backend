import { Request, Response, NextFunction } from "express";

const asyncMiddleware =
  (thefunc: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(thefunc(req, res, next)).catch(next);
  };

export default asyncMiddleware;
