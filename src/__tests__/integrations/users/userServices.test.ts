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

    test("Should insert the information of the new user in the database", () => {

    });

/*
    test("POST /users - You must be able to create a users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const resp = await request(app).post('/users').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedIUser)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("stock")
        expect(resp.body).toHaveProperty("typeId")
        expect(resp.status).toBe(201)        
    })

    test("POST /users - Dont't permit to create users without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const resp = await request(app).post('/users').send(mockedIUser)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)  
    })

    test("POST /users - Dont't permit to create users not being admin",async () => {
        const loginAdminResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const loginResponse = await request(app).post("/login").send(mockedIUser);
        const resp = await request(app).post('/users').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedIUser)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("GET /users - User admin must be able to list all users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdmin);
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

    test("PATCH /users/:id - permit to update users",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`

        const types = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}

        const userTobeUpdated = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdatedId}`).set("Authorization",token).send(newValues)
        const userUpdated = await request(app).get("/users").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(userUpdated.body[0].name).toEqual("pizza")
        expect(userUpdated.body[0].stock).toEqual(2)
        expect(userUpdated.body[0].name).toEqual(types.body[0].id)
    })

    test("PATCH /users/:id -  Dont't permit to update users not being admin",async () => {

        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`

        const types = await request(app).get('/types').set("Authorization", token)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}


  
        const userTobeUpdated = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).patch(`/users/${userTobeUpdatedId}`).set("Authorization",tokenUser).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("PATCH /users/:id -  Dont't permit to patch users without authentication",async () => {

         const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const types = await request(app).get('/types').set("Authorization", token)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}


        const userTobeUpdated = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id


        const resp = await request(app).patch(`/users/${userTobeUpdatedId}`).send(newValues)

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
        expect(resp.status).toBe(403)
             
    })
    */
})
