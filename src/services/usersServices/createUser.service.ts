import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUserRequest } from "../../interfaces/users";

const createUserService = async (data: IUserRequest): Promise<User> => {
  const userDatabase = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const { name, cpf, email, password, telephone, type, address } = data;

  const findUser = await userDatabase.findOneBy({
    email: data.email,
  });

  if (findUser) {
    throw new AppError("User already exists!", 409);
  }

  const newAdress = addressRepository.create(address);
  const adr = await addressRepository.save(newAdress);

  let userData = {
    name: name,
    cpf: cpf,
    email: email,
    password: password,
    telephone: telephone,
    address: [],
  };
  console.log(userData);
  const newUser = userDatabase.create(userData);
  newUser.address.push(adr);
  await userDatabase.save(newUser);

  return newUser;
};

export { createUserService };
