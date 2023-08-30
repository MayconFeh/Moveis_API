import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/error";

const validateUserPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId)
  const { admin } = res.locals.decoded;
  
  if (!admin && userId !== id) {
    throw new ErrorApp("Insufficient permission", 403);
  }
  return next();
};

export default  validateUserPermission ;
