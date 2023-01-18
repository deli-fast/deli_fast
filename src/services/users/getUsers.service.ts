import { ObjectShape } from "yup/lib/object";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { listUsersSerializer } from "../../serializers/users.serializer";

const getUsersService = async (): Promise<ObjectShape[]> => {
  const usersRepository = AppDataSource.getRepository(User);
  const users = await usersRepository.find({
    where: { isActive: true },
    relations: { address: true },
  });

  const usersReturn = await listUsersSerializer.validate(users, {
    stripUnknown: true,
  });
  return usersReturn;
};

export { getUsersService };
