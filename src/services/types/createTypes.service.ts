import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/errors";
import { Itypes, ItypesRequest } from "./../../interfaces/types/index";

const createTypesService = async (data: ItypesRequest): Promise<Itypes> => {
  const typesRepository = AppDataSource.getRepository(Type);

  const typesAlreadyExists = await typesRepository.findOneBy({
    name: data.name,
  });

  if (typesAlreadyExists) {
    throw new AppError("Type already exists", 400);
  }

  const createTypes = typesRepository.create({
    ...data,
  });

  await typesRepository.save(createTypes);

  return createTypes;
};

export default createTypesService;
