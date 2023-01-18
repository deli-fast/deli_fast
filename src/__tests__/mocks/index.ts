import { IUserLogin } from "../../interfaces/login";
import { ItypesRequest } from "../../interfaces/types";
import { IUserRequest } from "../../interfaces/users";

const mockedIUser : IUserRequest ={
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

const mockedIUserAdmin : IUserRequest ={
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


const mockedIUserLogin : IUserLogin = {
    email : 'josue@mail.com',
    password : '1234'
}

const mockedIUserAdminLogin : IUserLogin = {
    email: 'admin@mail.com',
    password: '1234'
}


const mockedITypesRequest : ItypesRequest = {
    name : 'lanche'
}

const mockedIProductsRequest = {
    name : "X-Burguer",
    stock : 1, 
    typeId : "",
}

const mockedIOrdersRequest = {
    date: "2022-12-22",
    value: '200',
    status: "em andamento",
    user: ""
}

export {
    mockedIUser,
    mockedIUserAdmin,
    mockedIUserLogin,
    mockedIUserAdminLogin,
    mockedITypesRequest,
    mockedIOrdersRequest,
    mockedIProductsRequest
}