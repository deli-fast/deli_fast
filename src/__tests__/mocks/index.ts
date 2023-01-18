import { IUserLogin } from "../../interfaces/login";
import { ItypesRequest } from "../../interfaces/types";
import { IUserRequest } from "../../interfaces/users";

export const mockedIUser : IUserRequest ={
    name: 'josue',
    cpf: '05856927858',
    email: 'josue@mail.com',
    password: '1234',
    telephone: '41999025689',
    type : "normal",
    address: {
        district: 'Rua das Graças',
        zipCode: '19580022',
        number: '15',
        city: 'Curitiba',
        state: 'PR',
    },
}

export const mockedIUserAdmin : IUserRequest ={
    name: 'admin',
    cpf: '05856998858',
    email: 'admin@mail.com',
    password: '1234',
    telephone: '41999025689',
    type : "admin",
    address: {
        district: 'Rua das Graças',
        zipCode: '19580022',
        number: '15',
        city: 'Curitiba',
        state: 'PR',
    },
}


export const mockedIUserLogin : IUserLogin = {
    email : 'josue@mail.com',
    password : '1234'
}

export const mockedIUserAdminLogin : IUserLogin = {
    email: 'admin@mail.com',
    password: '1234'
}


export const mockedITypesRequest : ItypesRequest = {
    name : 'lanche'
}

export const mockedIProductsRequest = {
    name : "X-Burguer",
    stock : 1, 
    typeId : "",
}