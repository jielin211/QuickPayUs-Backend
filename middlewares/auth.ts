import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUserDocument } from "../models/userModel";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token as string | undefined;
    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource.", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const userFound = await User.findById(decodedData.id);
    if (!userFound) {
      return next(
        new ErrorHandler("Please login to access this resource.", 401)
      );
    }
    req.user = userFound as IUserDocument;

    next();
  }
);

export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user?.role} is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
