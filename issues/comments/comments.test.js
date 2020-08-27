const request = require('supertest');

const server = require('../../api/server.js');


    describe('comments', () => {
        describe('get', () => {
            beforeEach(async () => {
                const res = await request(server).post('/login').send({
                    "username": "hailey",
                    "password": "pass123"
                })
                return usertoken = res.body.token;
            });
            it('get /api/issues/comments', async () => {
                const comments = await request(server).get('/api/issues/comments').set({ Authorization: usertoken });
    
                expect(comments.status).toBe(200);
            });
            it('get /api/issues/id/comments', async () => {
                const comments = await request(server).get('/api/issues/1/comments').set({ Authorization: usertoken });
    
                expect(comments.status).toBe(200);
            });
            it('get /api/issues/comments/id', async () => {
                const res = await request(server).post('/login').send({
                    "username": "hailey",
                    "password": "pass123"
                })
                const usertoken = res.body.token;
    
                const comments = await request(server).get('/api/issues/comments/1').set({ Authorization: usertoken });
    
                expect(comments.status).toBe(200);
            })
        });
        describe('post', () => {
            it('post /api/issues/id/comments', async () => {
                const res = await request(server).post('/login').send({
                    "username": "hailey",
                    "password": "pass123"
                })
                const usertoken = res.body.token;

                const comment = await request(server).post('/api/issues/1/comments').send({
                    "comment": "new comment"
                }).set({ Authorization: usertoken });

                expect(comment.status).toBe(201);
            });
        });
    });