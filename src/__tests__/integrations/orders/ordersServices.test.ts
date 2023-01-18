import { DataSource } from 'typeorm';
import AppDataSource from "../../../data-source";
import request from 'supertest';
import app from '../../../app';
import { mockedIOrdersRequest, mockedIUser, mockedIUserAdmin, mockedIUserAdminLogin, mockedIUserLogin } from '../../mocks';


describe("/orders", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error Data Source not initialized", err)
        })

        await request(app).post('/users').send(mockedIUserAdmin)
        await request(app).post('/users').send(mockedIUser)
   })

    afterAll(async() => {
        await connection.destroy()

    })


    test("POST /orders - You must be able to create a orders",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${loginResponse.body.token}`)

        mockedIOrdersRequest.user = users.body[0].id

       const resp = await request(app).post('/orders').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedIOrdersRequest)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("date")
        expect(resp.body).toHaveProperty("value")
        expect(resp.body).toHaveProperty("status")
        expect(resp.body).toHaveProperty("user")
        expect(resp.status).toBe(201)  
    })


    test("GET /orders - User admin must be able to list all orders",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const resp = await request(app).get('/orders').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveLength(1)
     
    })

    test("GET /orders - Dont't permit to list orders without authentication",async () => {
        const resp = await request(app).get('/orders')

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })

    test("GET /orders/:id - User admin must be able to list a especific orders",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const orders = await request(app).get('/orders').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).get(`/orders/${orders.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("date")
        expect(resp.body).toHaveProperty("value")
        expect(resp.body).toHaveProperty("status")
        expect(resp.body).toHaveProperty("user")
        expect(resp.status).toBe(200)     
     
    })

    test("GET /orders/:id - Dont't permit to list a especific orders without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const orders = await request(app).get('/orders').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).get(`/orders/${orders.body[0].id}`)
        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })



    test("PATCH /orders/:id - permit to update orders",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`

        const newValues =   { ...mockedIOrdersRequest, date : '2023-01-10' }

        const userTobeUpdated = await request(app).get("/orders").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const response = await request(app).patch(`/orders/${userTobeUpdatedId}`).set("Authorization",token).send(newValues)

        expect(response.status).toBe(200)
    })


    test("PATCH /orders/:id -  Dont't permit to patch orders without authentication",async () => {

        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const newValues =   { date : '2023-01-15' }

        const userTobeUpdated = await request(app).get("/orders").set("Authorization", token)
        const userTobeUpdatedId = userTobeUpdated.body[0].id

        const resp = await request(app).patch(`/orders/${userTobeUpdatedId}`).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    })


    test("DELETE /orders/:id -  Dont't permit to delete orders without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${loginResponse.body.token}`
        const userTobeDeleted = await request(app).get("/orders").set("Authorization", token)
        const userTobeDeletedId = userTobeDeleted.body[0].id

        const resp = await request(app).delete(`/orders/${userTobeDeletedId}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
     
    })


    test("DELETE /orders/:id -  Must be able to delete orders",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const  userTobeDeleted = await request(app).get('/orders').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).delete(`/orders/${userTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const finduser = await request(app).get(`/orders/${userTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(finduser.status).toBe(404)
        expect(finduser.body).toHaveProperty("message")
     
    })
})
