import { DataSource } from 'typeorm';
import AppDataSource from "../../../data-source";
import request from 'supertest';
import app from '../../../app';
import { mockedIProductsRequest, mockedITypesRequest, mockedIUser, mockedIUserAdmin, mockedIUserAdminLogin, mockedIUserLogin } from '../../mocks';


describe("/products", () => {
    let connection : DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((resp) => {
            connection = resp
        }).catch((err) => {
            console.error("Error Data Source not initialized", err)
        })

        await request(app).post('/users').send(mockedIUserAdmin)
        await request(app).post('/users').send(mockedIUser)
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        await request(app).post('/types').send(mockedITypesRequest).set("Authorization", `Bearer ${loginResponse.body.token}`)
   });

    afterAll(async() => {
        await connection.destroy()
    });


    test("POST /products - You must be able to create a product",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const types = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)
        mockedIProductsRequest.typeId = types.body[0].id
        const resp = await request(app).post('/products').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedIProductsRequest)

        expect(resp.body).toHaveProperty("id")
        expect(resp.body).toHaveProperty("name")
        expect(resp.body).toHaveProperty("stock")
        expect(resp.body).toHaveProperty("typeId")
        expect(resp.status).toBe(201)        
    });

    test("POST /products - Dont't permit to create products without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const types = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)
        mockedIProductsRequest.typeId = types.body[0].id
        const resp = await request(app).post('/products').send(mockedIProductsRequest)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)  
    });

    test("POST /products - Dont't permit to create products not being admin",async () => {
        const loginAdminResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const types = await request(app).get('/types').set("Authorization", `Bearer ${loginAdminResponse.body.token}`)
        mockedIProductsRequest.typeId = types.body[0].id


        const loginResponse = await request(app).post("/login").send(mockedIUser);
        const resp = await request(app).post('/products').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedIProductsRequest)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    });

    test("GET /products - User admin must be able to list all products",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdmin);
        const resp = await request(app).get('/products').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveLength(2)
     
    });

    test("GET /products - Dont't permit to list users without authentication",async () => {
        const resp = await request(app).get('/products')

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    });

    test("GET /products - Dont't permit to list products not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const resp = await request(app).get('/products').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    });

    test("PATCH /products/:id - permit to update products",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`

        const types = await request(app).get('/types').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}

        const productTobeUpdated = await request(app).get("/products").set("Authorization", token)
        const productTobeUpdatedId = productTobeUpdated.body[0].id

        const response = await request(app).patch(`/products/${productTobeUpdatedId}`).set("Authorization",token).send(newValues)
        const productUpdated = await request(app).get("/products").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(productUpdated.body[0].name).toEqual("pizza")
        expect(productUpdated.body[0].stock).toEqual(2)
        expect(productUpdated.body[0].name).toEqual(types.body[0].id)
    });

    test("PATCH /products/:id -  Dont't permit to update products not being admin",async () => {

        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`

        const types = await request(app).get('/types').set("Authorization", token)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}


  
        const productTobeUpdated = await request(app).get("/products").set("Authorization", token)
        const productTobeUpdatedId = productTobeUpdated.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).patch(`/products/${productTobeUpdatedId}`).set("Authorization",tokenUser).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    });

    test("PATCH /products/:id -  Dont't permit to patch products without authentication",async () => {

         const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const types = await request(app).get('/types').set("Authorization", token)

        const newValues = {name: "pizza", stock : 2, typeId : types.body[0].id}


        const productTobeUpdated = await request(app).get("/products").set("Authorization", token)
        const productTobeUpdatedId = productTobeUpdated.body[0].id


        const resp = await request(app).patch(`/products/${productTobeUpdatedId}`).send(newValues)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
             
    });

    test("DELETE /products/:id -  Must be able to delete products",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);
        const  productTobeDeleted = await request(app).get('/products').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const resp = await request(app).delete(`/products/${productTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const findProduct = await request(app).get(`/products/${productTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(findProduct.status).toBe(404)
        expect(findProduct.body).toHaveProperty("message")
     
    });

    test("DELETE /products/:id -  Dont't permit to delete products without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${loginResponse.body.token}`
        const productTobeDeleted = await request(app).get("/products").set("Authorization", token)
        const productTobeDeletedId = productTobeDeleted.body[0].id

        const resp = await request(app).delete(`/products/${productTobeDeletedId}`)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(401)
     
    });

    test("DELETE /products/:id -  Dont't permit to delete products not being admin",async () => {
        const loginResponse = await request(app).post("/login").send(mockedIUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedIUserAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`
        const productTobeDeleted = await request(app).get("/products").set("Authorization", token)
        const productTobeDeletedId = productTobeDeleted.body[0].id

        const tokenUser = `Bearer ${loginResponse.body.token}`
        const resp = await request(app).delete(`/products/${productTobeDeletedId}`).set("Authorization",tokenUser)

        expect(resp.body).toHaveProperty("message")
        expect(resp.status).toBe(403)
             
    });
});
