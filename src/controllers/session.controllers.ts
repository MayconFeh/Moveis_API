import { Request, Response } from "express";
import { Login, LoginReturn } from "../interfaces/login.interfaces";
import { sessionServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const login: Login = req.body;

  const token: LoginReturn = await sessionServices.create(login);

  return res.status(200).json(token);
};

export default { create };
