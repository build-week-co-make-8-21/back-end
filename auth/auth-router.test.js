const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../api/server');
const db = require('../data/db-config.js');
const Users = require('../users/users-model');

describe('auth-router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    describe('POST to /signup', () => {
        it('should respond with status code 201 created', () => {
            return request(server)
            .post('/signup')
            .send({ username: 'hailey', password: 'pass123', email: 'hailey@gmail.com'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should respond with a new user', () => {
            return request(server)
            .post('/signup')
            .send({username: 'hailey', password: 'pass123', email: 'hailey@gmail.com'})
            .then(res => {
                expect(res.body.data.username).toBe('hailey')
            })
        })
    })

    describe('POST to /login', () => {
        beforeEach(async () => {
            const user = { username: 'hailey', password: 'pass123', email: 'hailey@gmail.com'}
            const hash = bcrypt.hashSync(user.password, 8)
            user.password = hash;

            await db('users').truncate()
            await db('users').insert(user)
        })
        it('should respond with a status 200 OK', () => {
            return request(server)
            .post('/login')
            .send({username: 'hailey', password: 'pass123'})
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