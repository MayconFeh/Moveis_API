import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { ErrorApp } from "../errors/error";

const validateCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);
  const repository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category: Category | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  if (!category) {
    throw new ErrorApp("Category not found", 404);
  }
  res.locals.categoryId = id;
  return next();
};

export default  validateCategoryId ;
