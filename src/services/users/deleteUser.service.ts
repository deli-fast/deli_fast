import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUserDeleteRequest } from "../../interfaces/users";

const deleteUserService = async (payload: IUserDeleteRequest): Promise<{}> => {
  const usersRepository = AppDataSource.getRepository(User);
  console.log(payload.isAdmin, payload.userId);

  if (
    payload.isAdmin !== "admin" &&
    payload.userId !== payload.userToBeDeleted
  ) {
    throw new AppError("Unauthorized!", 401);
  }

  const user = await usersRepository.findOneBy({
    id: payload.userToBeDeleted,
    isActive: true,
  });

  if (!user) {
    throw new AppError("User does not exists!", 404);
  }

  user.isActive = false;
  await usersRepository.save(user);

  return {};
};
export { deleteUserService };
