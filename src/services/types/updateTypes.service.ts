import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { Itypes, ItypesRequest } from "./../../interfaces/types/index";

const updateTypesService = async (
  data: ItypesRequest,
  idType: string
): Promise<Itypes> => {
  const typesRepository = AppDataSource.getRepository(Type);

  const findType = await typesRepository.findOneBy({
    id: idType,
  });

  const updateType = typesRepository.create({
    ...findType,
    ...data,
  });

  await typesRepository.save(updateType);

  return updateType;
};

export default updateTypesService;
