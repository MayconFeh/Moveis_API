import { z } from "zod";
import {
  realEstateReadSchema,
  realEstateSchema,
  realEstateSchemaCreate,
} from "../schemas/realEstate.schemas";

type RealEstate = z.infer<typeof realEstateSchema>;
type RealEstateCreate = z.infer<typeof realEstateSchemaCreate>;
type RealEstateRead = z.infer<typeof realEstateReadSchema>;

export { RealEstate, RealEstateCreate, RealEstateRead };