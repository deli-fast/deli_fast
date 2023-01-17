import { DataSource } from 'typeorm';
import AppDataSource from "../../../data-source";
import request from 'supertest';
import app from '../../../app';
import { mockedIUserAdmin, mockedIUserAdminLogin } from '../../mocks';

describe("/login", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((resp) => {
            connection = resp
        }).catch((err) => {
            console.error("Error Data Source not initialized", err)
        })

        await request(app).post("/login").send(mockedIUserAdmin)
    })

    

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /login - should be able to login with the user",async () => {
        const resp = await request(app).post("/login").send(mockedIUserAdminLogin);
        
        expect(resp.body).toHaveProperty("token")
        expect(resp.status).toBe(200)
     
    })

    test("POST /login - Don't permit login with user incorrect password or email",async () => {
        const resp = await request(app).post("/login").send({
            email: "kenzie@mail.com",
            password: "1234567"
        });

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    })

    test("POST /login -  Don't permit login the user with isActive = false",async () => {
        const loginResp = await request(app).post("/login").send(mockedIUserAdminLogin);
        const user= await request(app).get('/users').set("Authorization", `Bearer ${loginResp.body.token}`)
        await request(app).delete(`/users/${user.body[0].id}`).set("Authorization", `Bearer ${loginResp.body.token}`)

        const resp = await request(app).post("/login").send(mockedIUserAdminLogin);
        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(400)
             
    })
})
