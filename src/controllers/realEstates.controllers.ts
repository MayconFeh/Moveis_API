import { Request, Response } from "express";
import { RealEstateCreate } from "../interfaces/realEstate.interfaces";
import { realEstatesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: RealEstateCreate = req.body;

  const realEstate = await realEstatesServices.create(payload);

  return res.status(201).json(realEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstates = await realEstatesServices.read();

  return res.status(200).json(realEstates);
};

export default { create, read };
