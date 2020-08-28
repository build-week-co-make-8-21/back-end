const request = require('supertest');
const server = require("../api/server");
const db = require('../data/db-config');

describe('categories-router', () => {
    beforeEach(async () => {
        await db('categories').truncate();
    });

    describe('GET /api/categories', () => {
        beforeEach(async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    "username": "test",
                    "password": "pass123"
                })
            return usertoken = res.body.token;
        });

        it('should login, use token, return status 200 OK and return json data', async () => {
            const categories = await request(server)
                .get('/api/categories')
                .set({ Authorization: usertoken })

            expect(categories.status).toBe(200);
            expect(categories.type).toMatch(/json/i)
        });
        
        it('should get category by id, and return json data', async () => {
            const oneCategory = await request(server)
            .get('/api/categories/1')
            .set({ Authorization: usertoken })
            
            expect(oneCategory.type).toMatch(/json/i);
        });            
    });

    describe('POST a new category', () => {
        it('should login, use token, post a new category', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    username: "test",
                    password: "pass123"
                })
            const usertoken = res.body.token;

            const newCategory = await request(server)
                .post('/api/categories')
                .set({ Authorization: usertoken })
                .send({
                    categoryId: 1,
                    categoryName: "Test Category Name"
                })
                .expect(201)
                expect(newCategory.type).toMatch(/json/i);
        });
    });

    describe('PUT update a categoryName', () => {
        it('should login, use token to update,  return status 200 OK', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    username: "test",
                    password: "pass123"
                })
            const usertoken = res.body.token;

            const updateCategory = await request(server) 
                .put('/api/categories/1')
                .set({ Authorization: usertoken })
                .send({
                    categoryName: "Updated Category"
                })

            expect(updateCategory.status).toBe(200)
        });        
        it('should login, use token to update, return success message', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    username: "test",
                    password: "pass123"
                })
            const usertoken = res.body.token;

            const updateCategory2 = await request(server) 
                .put('/api/categories/1')
                .set({ Authorization: usertoken })
                .send({
                    categoryName: "Updated Category"
                })

            expect(updateCategory2.body.message).toContain("Category updated successfully")
        });
    });

    describe('Cannot DELETE a category WITHOUT token', () => {
        it('should return status 200 OK when category is deleted', async () => {
    
            const deleteCategory = await request(server)
                .delete('/api/categories/4')
                .send()

            expect(deleteCategory.status).toBe(401)
            expect(deleteCategory.type).toMatch(/json/i);
            expect(deleteCategory.error.message).toContain("cannot DELETE /api/categories/4")
        });
    });
});