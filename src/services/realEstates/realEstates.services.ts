import { Repository } from "typeorm";
import { RealEstateCreate } from "../../interfaces/realEstate.interfaces";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { ErrorApp } from "../../errors/error";

const create = async (payload: RealEstateCreate): Promise<RealEstate> => {
  const repositoryRE: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const repositoryAdd: Repository<Address> =
    AppDataSource.getRepository(Address);

  const repositoryCat: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await repositoryCat.findOne({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new ErrorApp("Category not found", 404);
  }

  const addressExists: Address | null = await repositoryAdd.findOne({
    where: {
      street: payload.address.street,
      zipCode: payload.address.zipCode,
      city: payload.address.city,
      state: payload.address.state,
    },
  });

  if (addressExists) {
    throw new ErrorApp("Address already exists", 409);
  }

  const addressData = payload.address;

  const address: Address = repositoryAdd.create(addressData);

  await repositoryAdd.save(address);

  const result: RealEstate = repositoryRE.create({
    ...payload,
    address: address,
    category: category,
  });
  await repositoryRE.save(result);

  return result;
};

const read = async (): Promise<RealEstate[]> => {

  const repository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  
  const realEstates: RealEstate[] = await repository.find({
    relations: {
      address: true,
    },
  });
  
  return realEstates;
};

export default { create, read };
