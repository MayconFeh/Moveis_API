import { Request, Response } from "express";
import {
  UserRead,
  UserCreate,
  UserReturn,
  UserUpdate,
} from "../interfaces/users.interfaces";
import { usersServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: UserCreate = req.body;

  const user: UserReturn = await usersServices.create(payload);

  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await usersServices.read();

  return res.status(200).json(users);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  const payload: UserUpdate = req.body;

  const updatedUser: UserReturn = await usersServices.update(id, payload);

  return res.status(200).json(updatedUser);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  await id;

  return res.status(204).send();
};

export default { create, read, update, destroy };
