import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { ErrorApp } from "../errors/error";

const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const id: number = Number(req.params.id);

  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await repository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ErrorApp("User not found", 404);
  }
  return next();
};

export default  validateUserId ;
