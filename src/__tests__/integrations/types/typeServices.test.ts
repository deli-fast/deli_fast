import { DataSource } from 'typeorm';
import AppDataSource from "../../../data-source";
import request from 'supertest';
import app from '../../../app';
import { mockedITypesRequest, mockedIUser, mockedIUserAdmin, mockedIUserAdminLogin, mockedIUserLogin } from '../../mocks';


describe("/types", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((resp) => {
            connection = resp
        }).catch((err) => {
            console.error("Error Data Source not initialized", err)
        })

        await request(app).post('/users').send(mockedIUserAdmin)
        await request(app).post('/users').send(mockedIUser)
   })

    afterAll(async() => {
        await connection.destroy()
    })


    test("POST /types - You must be able to create a product type",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const resp = await request(app).post('/types').send(mockedITypesRequest).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("name")
        expect(resp.status).toBe(201)        
    })

    test("POST /types - Dont't permit to create types without authentication",async () => {
        const resp = await request(app).post('/types').send(mockedITypesRequest)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)  
    })

    test("POST /types - Dont't permit to create types not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUser);
        const resp = await request(app).post('/types').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedITypesRequest)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("GET /types - User admin must be able to list all types",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdmin);
        const resp = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveLength(1)
     
    })

    test("GET /types - Dont't permit to list users without authentication",async () => {
        const resp = await request(app).get('/types')

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })

    test("GET /types - Dont't permit to list types not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const resp = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("PATCH /types/:id - permit to update types",async () => {
        const newValues = {name: "pizza"}

        const loginResponse = await request(app).post("/login").send(mockedIUserAdmin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const typeTobeUpdated = await request(app).get("/types").set("Authorization", token)
        const typeTobeUpdatedId = typeTobeUpdated.body[0].id

        const response = await request(app).patch(`/types/${typeTobeUpdatedId}`).set("Authorization",token).send(newValues)
        const typeUpdated = await request(app).get("/types").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(typeUpdated.body[0].name).toEqual("pizza")
    })

    test("PATCH /types/:id -  Dont't permit to update types not being admin",async () => {
        const newValues = {name: "madeira"}
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`
        const typeTobeUpdated = await request(app).get("/types").set("Authorization", token)
        const typeTobeUpdatedId = typeTobeUpdated.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).patch(`/types/${typeTobeUpdatedId}`).set("Authorization",tokenUser).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("PATCH /types/:id -  Dont't permit to patch types without authentication",async () => {
        const newValues = {name: "potes"}

        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const typeTobeUpdated = await request(app).get("/types").set("Authorization", token)
        const typeTobeUpdatedId = typeTobeUpdated.body[0].id

        const resp = await request(app).patch(`/types/${typeTobeUpdatedId}`).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })

    test("DELETE /types/:id -  Dont't permit to delete types without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${loginResponse.body.token}`
        const typeTobeDeleted = await request(app).get("/types").set("Authorization", token)
        const typeTobeDeletedId = typeTobeDeleted.body[0].id

        const resp = await request(app).delete(`/types/${typeTobeDeletedId}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
     
    })

    test("DELETE /types/:id -  Dont't permit to delete types not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`
        const typeTobeDeleted = await request(app).get("/types").set("Authorization", token)
        const typeTobeDeletedId = typeTobeDeleted.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).delete(`/types/${typeTobeDeletedId}`).set("Authorization",tokenUser)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("DELETE /types/:id -  Must be able to delete types",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const typeTobeDeleted = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).delete(`/types/${typeTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const findType = await request(app).get(`/types/${typeTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(findType.status).toBe(404)
        expect(findType.body).toHaveProperty("message")
     
    })
})

