# deli_fast

POST - /users

•Rota recebe os seguintes dados: name, cpf, e-mail, telephone, type, address
{name : string,
cpf : string,
email : string,
password : string,
telephone : string,
type : string,
address: {
"district": string,
"zipCode": string,
"number": string,
"city": string,
"state": string
}
 }
 
•A rota de criação deve retornar todos os dados, com exceção da hash de senha.

•Não podem ser cadastrados dois usuários com o mesmo e-mail.


GET - /users

•A rota deve retornar todos os dados dos usuários, com exceção da hash de senha.

•A rota pode ser acessada apenas por administradores.


PATCH - /users/<id>
 
•A rota deve atualizar os dados do usuário.
 
•Não deve ser possível atualizar os campos  type e isActive.
 
•Apenas administradores podem atualizar qualquer usuário, usuários não-
administradores podem apenas atualizar seu próprio usuário.


DELETE - /users/<id>
 
•A rota deve realizar um soft delete do usuário, alterando isActive para false.
 
 
•Apenas administradores podem remover qualquer usuário, usuários não-
administradores podem apenas remover seu próprio usuário.
 
 
POST - /login
 
•Rota recebe os seguintes dados: e-mail, password
{email : string,
password : string}
 
•Não deve ser possível realizar o login com um usuário inativo
 
•O login deve validar se o usuário existe e validar se a senha está correta.
•A rota deve retornar o token do usuário.


POST - /orders
 
•Rota recebe os seguintes dados: date, idCliente, value, status
{date : string,
idCliente : string,
value : string,
status : string
}
 
•A rota precisa de autenticação para ser acessada.
 
•A rota deve retornar todos os dados.


GET - /orders
 
•A rota deve retornar todos as orders, sem o hash de senha do cliente
 
•Usuários não-administradores podem apenas visualizar suas próprias ordens. 


GET - /orders/<id>
 
•A rota deve retornar todos os dados da order, exceto o hash de senha do cliente
 
•Usuários não-administradores podem apenas visualizar suas próprias ordens. 


PATCH - /orders/<id>
 
•A rota deve atualizar os dados do usuário.
 
•Apenas administradores podem atualizar qualquer order, usuários não-
administradores podem apenas atualizar suas próprias ordens.


DELETE - /orders/<id>
 
•A rota deve realizar um soft delete da order, alterando status para finalizada.
 
•Apenas administradores podem remover qualquer order, usuários não-
administradores podem apenas remover suas próprias orders.


POST - /products
 
•Rota recebe os seguintes dados: name, idType
{name : string,
idType : string
}
 
•A rota precisa de autenticação para ser acessada.
 
•A rota pode ser acessada apenas por administradores.
 
•A rota deve retornar todos os dados.


GET - /products
 
•A rota deve retornar todos os produtos
 
•A rota pode ser acessada apenas por administradores.


PATCH - /products/<id>
 
•A rota deve atualizar os dados dos produtos.
 
•A rota pode ser acessada apenas por administradores.


DELETE - /products/<id>
 
•A rota pode ser acessada apenas por administradores.
 
 
POST - /types
 
•Rota recebe os seguintes dados: name, idType
{name : string}
 
•A rota precisa de autenticação para ser acessada.
 
•A rota pode ser acessada apenas por administradores.
 
•A rota deve retornar todos os dados.


GET - /types
 
•A rota deve retornar todos os types
 
•A rota pode ser acessada apenas por administradores.


PATCH - /types/<id>
•A rota deve atualizar os dados dos types.
•A rota pode ser acessada apenas por administradores.


DELETE - /types/<id>
•A rota pode ser acessada apenas por administradores.
