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

        it('should get categories', async () => {
            const categories = await request(server)
                .get('/api/categories')
                .set({ Authorization: usertoken })

            expect(categories.status).toBe(200);
            expect(categories.type).toMatch(/json/i)
        });

        it('should get category by id', async () => {
            const oneCategory = await request(server)
                .get('/api/categories/1')
                .set({ Authorization: usertoken })

            expect(oneCategory.type).toMatch(/json/i);
        });            
    });

    describe('POST a new category', () => {
        it('should post a new category', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    username: "test",
                    password: "pass123"
                })
            const usertoken = res.body.token;

            const newCategory = await request(server)
                .post('/api/categories')
                .send({
                    categoryId: 1,
                    categoryName: "Test Category Name"
                })
                .set({ Authorization: usertoken });

            expect(newCategory.type).toMatch(/json/i);
            expect(newCategory.status).toBe(201)
        });
    });
});