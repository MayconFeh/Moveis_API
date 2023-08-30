import { NextFunction, Request, Response } from "express";
import { UserEmail } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import User from "../entities/users.entity";
import { AppDataSource } from "../data-source";
import { ErrorApp } from "../errors/error";

const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user: UserEmail = req.body;
  const repository: Repository<User> = AppDataSource.getRepository(User);
  const foundUser: User | null = await repository.findOne({
    where: {
      email: user.email,
    },
  });
  if (foundUser) {
    throw new ErrorApp("Email already exists", 409);
  }
  return next();
};

export default  validateEmail ;
