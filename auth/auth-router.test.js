const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../api/server');
const db = require('../data/db-config.js');
const Users = require('../users/users-model');

describe('auth-router', () => {
    beforeEach(async () => {
        await db('users');
    })
    describe('POST to /signup', () => {
        it('should respond with status code 201 created', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;
    
            const users = await request(server).get('/api/users').set({ Authorization: usertoken });
    
            await users.body.map(async user => {
                if(user.username === "newperson") {
                    await request(server).delete(`/api/users/${user.userId}`).set({ Authorization: usertoken });
                }
            });

            return request(server)
            .post('/signup')
            .send({ username: 'newperson', password: 'pass123', email: 'newperson@gmail.com'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should respond with a new user', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;
    
            const users = await request(server).get('/api/users').set({ Authorization: usertoken });
    
            await users.body.map(async user => {
                if(user.username === "newperson2") {
                    await request(server).delete(`/api/users/${user.userId}`).set({ Authorization: usertoken });
                }
            });

            return request(server)
            .post('/signup')
            .send({username: 'newperson2', password: 'pass123', email: 'newperson2@gmail.com'})
            .then(res => {
                expect(res.body.data.username).toBe('newperson2')
            })
        })
    })

    describe('POST to /login', () => {
        beforeEach(async () => {
            const user = { username: 'hailey', password: 'pass123', email: 'hailey@gmail.com'}
            const hash = bcrypt.hashSync(user.password, 8)
            user.password = hash;

            await db('users')
        })
        it('should respond with a status 200 OK', () => {
            return request(server)
            .post('/login')
            .send({ username: 'hailey', password: 'pass123' })
            .then(res => {
                expect(res.status).toBe(200)
            })

        })
        it('should respond with a welcome message', () => {
            return request(server)
            .post('/login')
            .send({ username: 'hailey', password: 'pass123' })
            .then(res => {
                expect(res.body.message).toContain('Welcome, hailey')
            })
        })
    })
});