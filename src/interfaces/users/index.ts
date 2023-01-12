import { array } from "yup";

export enum EnumUser {
  ADMIN = "admin",
  DELIVERYMAN = "deliveryman",
  NORMAL = "normal",
}

interface IAdress {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}

interface IUserRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  telephone: string;
  type: EnumUser;
  address: IAdress;
}

interface IUserResponse {
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  type: EnumUser;
  address: IAdress;
}

export { IAdress, IUserRequest, IUserResponse };
