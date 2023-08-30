import { Request, Response } from "express";
import {
  Categories,
  CategoryRead,
  CategoryCreate,
} from "../interfaces/categories.interfaces";
import { categoriesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: CategoryCreate = req.body;

  const category: Categories = await categoriesServices.create(payload);

  return res.status(201).json(category);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories: CategoryRead = await categoriesServices.read();

  return res.status(200).json(categories);
};

const readREByCategory = async ( req: Request, res: Response ): Promise<Response> => {
  const id: number = res.locals.categoryId;

  const realEstateRead = await categoriesServices.readREByCategory(id);

  return res.status(200).json(realEstateRead);
};

export default { create, read, readREByCategory };
