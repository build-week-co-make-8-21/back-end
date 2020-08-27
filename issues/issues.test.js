const request = require('supertest');

const server = require('../api/server.js');


describe('issues', () => {
    describe('get', () => {
        it('get /api/issues', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })

            const issues = await request(server).get('/api/issues').set({ Authorization: res.body.token });

            expect(issues.status).toBe(200);
            expect(issues.body).toHaveLength(3);
        });
        it('get /api/issues/id', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;

            const issue = await request(server).get('/api/issues/1').set({ Authorization: usertoken });

            expect(issue.status).toBe(200);
            expect(issue.type).toBe('application/json');
        });
    });
    describe('post', () => {
        it('post /api/issues', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;

            const issue = await request(server).post('/api/issues').send({
                "title": "new title",
                "description": "new description",
                "categoryId": 2
            }).set({ Authorization: usertoken });

            expect(issue.status).toBe(201);
        });
    });
    describe('put', () => {
        it('put /api/issues/id', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;

            const issue = await request(server).put('/api/issues/3').send({
                "title": "edited title",
                "description": "edited description",
                "categoryId": 3
            }).set({ Authorization: usertoken });

            expect(issue.status).toBe(203);
        });
    });
    describe('delete', () => {
        it('delete /api/issues/id', async () => {
            const res = await request(server).post('/login').send({
                "username": "hailey",
                "password": "pass123"
            })
            const usertoken = res.body.token;

            const issues = await request(server).get('/api/issues').set({ Authorization: usertoken });

            await issues.body.map(async (issue) => {
                if(issue.issueId > 3) {
                   await request(server).delete(`/api/issues/${issue.issueId}`).set({ Authorization: usertoken });
                }
                else {
                    expect(issues.body).toHaveLength(4)
                }
            })

            expect(issues.body).toHaveLength(4);
        });
    });
});