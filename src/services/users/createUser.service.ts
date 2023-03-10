import e from "express";
import { ObjectShape } from "yup/lib/object";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUserRequest } from "../../interfaces/users";
import {
  addrressSerializer,
  createUserSerializer,
  returnUserSerializer,
} from "../../serializers/users.serializer";

const createUserService = async (data: IUserRequest): Promise<ObjectShape> => {
  const userDatabase = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const { name, cpf, email, password, telephone, type, address } = data;

  const findUser = await userDatabase.findOneBy({
    email: data.email,
  });

  if (findUser) {
    throw new AppError("User already exists!", 409);
  }

  let userData = {
    name: name,
    cpf: cpf,
    email: email,
    password: password,
    type: type,
    telephone: telephone,
    address: [],
  };

  try {
    await createUserSerializer.validate(userData, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (error) {
    throw new AppError(error.errors, 401);
  }

  try {
    await addrressSerializer.validate(address, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (error) {
    throw new AppError(error.errors, 401);
  }

  const newAddress = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const newUser = userDatabase.create(userData);
  newUser.address.push(newAddress);
  await userDatabase.save(newUser);

  const returnUser = await returnUserSerializer.validate(newUser, {
    stripUnknown: true,
  });

  return returnUser;
};

export { createUserService };
