import { NextFunction, Request, Response } from "express";
import { ScheduleCreate } from "../interfaces/schedules.interfaces";
import { ErrorApp } from "../errors/error";

const validateDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {

  const schedule: ScheduleCreate = req.body;
  
  const { date, hour } = schedule;

  const [year, month, day]: Array<number> = date.split("/").map(Number);

  const [hourOfDay, minute]: Array<number> = hour.split(":").map(Number);

  const scheduleDateTime = new Date(year, month - 1, day, hourOfDay, minute);

  if (scheduleDateTime.getHours() < 8 || scheduleDateTime.getHours() >= 18) {
    throw new ErrorApp("Invalid hour, available times are 8AM to 18PM", 400);
  }

  if (scheduleDateTime.getDay() === 0 || scheduleDateTime.getDay() === 6) {
    throw new ErrorApp("Invalid date, work days are monday to friday", 400);
  }
  return next();
};

export default  validateDate ;
