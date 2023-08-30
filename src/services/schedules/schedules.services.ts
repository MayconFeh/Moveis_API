import { Repository } from "typeorm";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  ScheduleCreate,
  ScheduleReturn,
} from "../../interfaces/schedules.interfaces";
import { ErrorApp } from "../../errors/error";

const create = async (
  userId: number,
  payload: ScheduleCreate
): Promise<ScheduleReturn> => {
  const repository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const { date, hour, realEstateId } = payload;
  

  const UserSchedule: Schedule[] = await repository
    .createQueryBuilder("schedules")
    .where("schedules.user = :userId", { userId })
    .andWhere("schedules.date = :date", { date })
    .andWhere("schedules.hour = :hour", { hour })
    .getMany();

  if (UserSchedule.length !== 0) {
    throw new ErrorApp("User schedule to this real estate at this date and time already exists",409);
  }

  const RealEstateSchedule: Schedule[] = await repository
    .createQueryBuilder("schedules")
    .where("schedules.realEstate = :realEstateId", { realEstateId })
    .andWhere("schedules.date = :date", { date })
    .andWhere("schedules.hour = :hour", { hour })
    .getMany();

  if (RealEstateSchedule.length !== 0) {
    throw new ErrorApp("Schedule to this real estate at this date and time already exists",409);
  }

  const schedule: Schedule = repository.create({
    date: payload.date,
    hour: payload.hour,
    realEstate: { id: payload.realEstateId },
    user: { id: userId },
  });

  await repository.save(schedule);

  const result: ScheduleReturn = { message: "Schedule created" };

  return result;
};

const read = async (realEstateId: number): Promise<RealEstate | null> => {
  const repository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await repository
    .createQueryBuilder("real_estate")
    .leftJoinAndSelect("real_estate.address", "address")
    .leftJoinAndSelect("real_estate.category", "category")
    .leftJoinAndSelect("real_estate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :realEstateId", { realEstateId })
    .getOne();

  return realEstate;
};

export default { create, read };
