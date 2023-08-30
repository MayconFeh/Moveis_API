import { Request, Response } from "express";
import { ScheduleCreate } from "../interfaces/schedules.interfaces";
import { schedulesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(res.locals.userId);

  const payload: ScheduleCreate = req.body;

  const schedule = await schedulesServices.create(id, payload);

  return res.status(201).json(schedule);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  const schedules = await schedulesServices.read(id);

  return res.status(200).json(schedules);
};

export default { create, read };
