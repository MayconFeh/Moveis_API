import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/error";

const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals.decoded;
  if (!admin) {
    throw new ErrorApp("Insufficient permission", 403);
  }
  return next();
};

export default  validateAdmin ;
