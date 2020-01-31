const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('server', function(){
    beforeEach(async () => {
        await db('users').truncate();
    })
    

    const user = {username: 'abc', password: 'abc'}

    describe('POST /register', function() {
        it('should return 201 OK', function() {
            return request(server).post('/api/auth/register').send(user)
            .then(res => {
                expect(res.status).toBe(201)
            })
        })

        it('should return the created user', function(){
            return request(server).post('/api/auth/register').send(user)
            .then(res => {
                expect(res.body).toStrictEqual([{id: 1, username: 'abc'}])
            })
        })
    })

    describe('POST /login', function() {
        it('should return 200 OK', async() => {
            await request(server).post('/api/auth/register').send(user);
            let response = await request(server).post('/api/auth/login').send(user)
            expect(response.status).toBe(200)
        })

        it('it should return 401 Invalid status', function(){
            const badUser = {username: '1231243', password: '12342134'}
            return request(server).post('/api/auth/login').send(badUser)
            .then(res => {
                expect(res.status).toBe(401)
            })
        })
    })
})