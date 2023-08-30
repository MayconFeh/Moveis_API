import { Repository } from "typeorm";
import {
  Categories,
  CategoryCreate,
  CategoryRead,
} from "../../interfaces/categories.interfaces";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  categoryReadSchema,
  categorySchema,
} from "../../schemas/categories.schemas";
import { ErrorApp } from "../../errors/error";

const create = async (payload: CategoryCreate): Promise<Categories> => {
  const repository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await repository.findOne({
    where: {
      name: payload.name,
    },
  });
  if (category) {
    throw new ErrorApp("Category already exists", 409);
  }
  const createdCategory: Category = repository.create(payload);

  await repository.save(createdCategory);

  const result: Categories = categorySchema.parse(createdCategory);

  return result;
};

const read = async (): Promise<CategoryRead> => {
  const repository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] = await repository.find();

  const result: CategoryRead = categoryReadSchema.parse(categories);

  return result;
};

const readREByCategory = async (categoryId: number): Promise<Category | null> => {
  const repository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const result: Category | null = await repository
    .createQueryBuilder("categories")
    .leftJoinAndSelect("categories.realEstate", "realEstate")
    .where("categories.id = :categoryId", { categoryId })
    .getOne();

  return result;
};
export default { create, read, readREByCategory };
