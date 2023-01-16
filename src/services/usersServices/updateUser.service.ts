import { hash } from "bcryptjs";
import { ObjectShape } from "yup/lib/object";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUserUpdate } from "../../interfaces/users";
import { returnUserSerializer } from "../../serializers/users.serializer";

const updateUserService = async (
  id: string,
  payload: IUserUpdate
): Promise<ObjectShape> => {
  if (!id) {
    throw new AppError("Invalid id", 409);
  }

  console.log(payload);

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User does not exists!", 404);
  }

  const updateUser = await userRepository.update(id, {
    name: payload.name ? payload.name : user.name,
    telephone: payload.telephone ? payload.telephone : user.telephone,
    email: payload.email ? payload.email : user.email,
    cpf: payload.cpf ? payload.cpf : user.cpf,
    password: payload.password
      ? await hash(payload.password, 10)
      : user.password,
  });

  const returnUserUpdate = await returnUserSerializer.validate(
    await userRepository.findOneBy({ id }),
    { stripUnknown: true }
  );

  return returnUserUpdate;
};

export { updateUserService };
