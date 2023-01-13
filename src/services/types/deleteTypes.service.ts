import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/errors";

const deleteTypesService = async (idType: string) => {
  const typesRepository = AppDataSource.getRepository(Type);

  const findType = await typesRepository.findOneBy({
    id: idType,
  });

  if (!findType) {
    throw new AppError("Type not exists", 404);
  }

  await typesRepository.remove(findType);
  /* await typesRepository.save() */
};

export default deleteTypesService;
