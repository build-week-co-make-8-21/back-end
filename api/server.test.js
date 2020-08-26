const request = require('supertest');

const server = require('./server.js');
const db = require('../data/db-config.js');

describe('server', () => {
    describe('issues', () => {
        it('should add a new issue', async () => {
            await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            });
        })
    })
});