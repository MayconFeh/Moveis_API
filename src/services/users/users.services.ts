import { Repository } from "typeorm";
import {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
} from "../../interfaces/users.interfaces";
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import { userReadSchema, userSchemaReturn } from "../../schemas/users.schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const createdUser: User = repository.create(payload);

  await repository.save(createdUser);

  const result: UserReturn = userSchemaReturn.parse(createdUser);

  return result;
};

const read = async (): Promise<UserRead> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: User[] = await repository.find();

  const result: UserRead = userReadSchema.parse(user);

  return result;
};

const update = async (id: number, payload: UserUpdate): Promise<UserReturn> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const foundUser: User | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  const user: User = repository.create({
    ...foundUser,
    ...payload,
  });
  await repository.save(user);

  const result: UserReturn = userSchemaReturn.parse(user);
  return result;
};

const destroy = async (id: number): Promise<void> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  await repository.softRemove(user!);
};

export default { create, read, update, destroy };
