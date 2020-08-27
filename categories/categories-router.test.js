const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config.js');
const { intersect } = require('../data/db-config.js');
const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');


describe('categories-router', () => {
    let token
    beforeEach(async () => {
        const res = await request(server)
        .post('/login')
        .send({ "username": 'hailey', "password": 'pass123' })
        .then(res => {
            token = res.body.token
        })
        await db('users')
    })
    describe('GET /api/categories', () => {
        it('should respond with status 200 OK', () => {
            return request(server)
            .get('/api/categories')
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })
})