type TEnumUser = "ADMIN" | "DELIVERYMAN" | "NORMAL";

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
  type: string;
  address?: IAdress;
}

interface IUserResponse {
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  type: any;
  address: IAdress;
}

interface IUserDeleteRequest {
  userId: string;
  isAdmin: string;
  userToBeDeleted: string;
}

interface IUserUpdate {
  name?: string;
  cpf?: string;
  email?: string;
  telephone?: string;
  password?: string;
}

interface IUserUpdateResponse {
  name?: string;
  cpf?: string;
  email?: string;
  telephone?: string;
}

export {
  IAdress,
  IUserRequest,
  IUserResponse,
  IUserDeleteRequest,
  IUserUpdate,
  IUserUpdateResponse,
  TEnumUser,
};
