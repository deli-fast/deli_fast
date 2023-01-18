import { DataSource } from 'typeorm';
import AppDataSource from "../../../data-source";
import request from 'supertest';
import app from '../../../app';
import { mockedIUser, mockedIUserAdmin, mockedIUserAdminLogin, mockedIUserLogin } from '../../mocks';


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error Data Source not initialized", err)
        })
   })

    afterAll(async() => {
        await connection.destroy()

    })


    test("POST /users - You must be able to create a users",async () => {
        const resp = await request(app).post('/users').send(mockedIUserAdmin)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("cpf")
        expect(resp.body).toHaveProperty("email")
        expect(resp.body).toHaveProperty("telephone")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("type")
        expect(resp.body).toHaveProperty("address")
        expect(resp.body).not.toHaveProperty("password")
        expect(resp.status).toBe(201)        
    })


    test("GET /users - User admin must be able to list all users",async () => {
        await request(app).post('/users').send(mockedIUser)
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const resp = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveLength(2)
     
    })

    test("GET /users - Dont't permit to list users without authentication",async () => {
        const resp = await request(app).get('/users')

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })

    test("GET /users - Dont't permit to list users not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const resp = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("GET /users/:id - Dont't permit to list a especific users not being admin",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const resp = await request(app).get(`/users/${users.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("GET /users/:id - User admin must be able to list a especific users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).get(`/users/${users.body[1].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("cpf")
        expect(resp.body).toHaveProperty("email")
        expect(resp.body).toHaveProperty("telephone")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("type")
        expect(resp.status).toBe(200)     
     
    })

    test("GET /users/:id - Dont't permit to list a especific users without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).get(`/users/${users.body[0].id}`)
        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })



    test("PATCH /users/:id - permit to update users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`

        const newValues =   { name: 'pedro',  email: 'pedro@mail.com' }

        const userTobeUpdated = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[1].id

        const response = await request(app).patch(`/users/${userTobeUpdatedId}`).set("Authorization",token).send(newValues)

        expect(response.status).toBe(200)
    })

    test("PATCH /users/:id -  Dont't permit to update other users not being admin",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const loginResponse = await request(app).post("/login").send({email: 'pedro@mail.com' , password : "1234"});

        const adminToken = `Bearer ${adminLoginResponse.body.token}`
        const token = `Bearer ${loginResponse.body.token}`

        const newValues = { name: 'Joao',  email: 'Joao@mail.com' }
  
        const userTobeUpdated = await request(app).get("/users").set("Authorization", adminToken)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const resp = await request(app).patch(`/users/${userTobeUpdatedId}`).set("Authorization",token).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("PATCH /users/:id -  Dont't permit to patch users without authentication",async () => {

        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const newValues = { name: 'Leticia',  email: 'leticia@mail.com' }

        const userTobeUpdated = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const resp = await request(app).patch(`/users/${userTobeUpdatedId}`).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })



    test("DELETE /users/:id -  Dont't permit to delete users without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${loginResponse.body.token}`
        const userTobeDeleted = await request(app).get("/users").set("Authorization", token)
        const userTobeDeletedId = userTobeDeleted.body[0].id

        const resp = await request(app).delete(`/users/${userTobeDeletedId}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
     
    })

    test("DELETE /users/:id -  Dont't permit to delete users not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`
        const userTobeDeleted = await request(app).get("/users").set("Authorization", token)
        const userTobeDeletedId = userTobeDeleted.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).delete(`/users/${userTobeDeletedId}`).set("Authorization",tokenUser)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })

    test("DELETE /users/:id -  Must be able to delete users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const  userTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).delete(`/users/${userTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const finduser = await request(app).get(`/users/${userTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(finduser.status).toBe(404)
        expect(finduser.body).toHaveProperty("message")
     
    })
})
