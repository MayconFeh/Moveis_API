import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { ScheduleCreate } from "../interfaces/schedules.interfaces";
import { ErrorApp } from "../errors/error";

const validateRealEstates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schedule: ScheduleCreate = req.body;

  const { realEstateId } = schedule;

  const { id } = req.params;

  const repository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await repository.findOne({
    where: {
      id: realEstateId || Number(id),
    },
  });
  if (!realEstate) {
    throw new ErrorApp("RealEstate not found", 404);
  }
  return next();
};

export default  validateRealEstates ;
