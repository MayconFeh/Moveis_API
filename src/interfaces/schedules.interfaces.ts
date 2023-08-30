import { z } from "zod";
import {
  scheduleSchema,
  scheduleSchemaCreate,
} from "../schemas/schedules.schemas";

type Schedule = z.infer<typeof scheduleSchema>;
type ScheduleCreate = z.infer<typeof scheduleSchemaCreate>;
type ScheduleReturn = {
  message: string;
};

export { Schedule, ScheduleCreate, ScheduleReturn };
