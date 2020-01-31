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

        // it('should return the created user', function(){
        //     return request(server).post('/api/auth/register').send(user)
        //     .then(res => {
        //         expect(res.body).toBe({id: 1, username: 'abc'})
        //     })
        // })
    })

    describe('POST /login', function() {
        it('should return 200 OK', function() {
            const user2= {username: 'blah', password: 'blah'}
            return request(server).post('/api/auth/login').send(user2)
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('it should return 401 Invalid status', function(){
            const badUser = {username: '1231243', password: '12342134'}
            return request(server).post('/api/auth/login').send(badUser)
            .then(res => {
                expect(res.status).toBe(401)
            })
        })
    })

    describe('GET /jokes', function() {
        it('should return status 200 OK', function(){

        })

        it('should return 500 unathorized', function(){

        })
    })
})