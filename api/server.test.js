const request = require('supertest');

const server = require('./server');
const db = require('../data/db-config.js');


describe('server', () => {
    describe('testing environment is testing', () => {
        it('should use testing env', () => {
            expect(process.env.NODE_ENV).toBe('testing')
        })
    })
    describe('GET /', () => {
        it('should return api message in the response', () => {
            return request(server)
            .get('/')
            .expect({server: "up and running, please navigate to a proper endpoint and login" })
        })
    })
});
