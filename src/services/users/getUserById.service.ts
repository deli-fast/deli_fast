import { ObjectShape } from "yup/lib/object";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUserResponse } from "../../interfaces/users";
import { returnUserSerializer } from "../../serializers/users.serializer";

const getUserByIdService = async (id: string): Promise<ObjectShape> => {
  if (!id) {
    throw new AppError("Invalid id!", 400);
  }

  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({ id });
  

  if (!user || !user.isActive) {
    throw new AppError("User does not exists!", 404);
  }

  const foundUser = await returnUserSerializer.validate(user);

  return foundUser;
};

export { getUserByIdService };
