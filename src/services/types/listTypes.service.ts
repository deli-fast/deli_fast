import { Itypes } from "./../../interfaces/types/index";
import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";

const listTypesService = async (): Promise<Itypes[]> => {
  const typesRepository = AppDataSource.getRepository(Type);

  const listTypes = await typesRepository.find();

  return listTypes;
};

export default listTypesService;
