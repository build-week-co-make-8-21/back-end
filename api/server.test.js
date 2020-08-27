const request = require('supertest');

const server = require('./server');
const db = require('../data/db-config.js');


describe('server', () => {
    test('testing environment is testing', () => {
            expect(process.env.NODE_ENV).toBe('testing')
        })

    describe('GET /', () => {
        it('should return api message in the response', async () => {
            let res = await request(server)
            .get('/')
            expect(res.body).toEqual({server: "up and running, please navigate to a proper endpoint and login" })
        });

        it('should return 200 OK', async () => {
            let res = await request(server)
                .get('/')
                expect(res.status).toBe(200)
        });
    });
});
