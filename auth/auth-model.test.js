const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');
const Table = require('./auth-model.js')

describe('table model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('insert function', () => {
        it('inserts user into db', async () => {
            let userCount;
            userCount = await db('users');
            expect(userCount).toHaveLength(0);
            await Table.add({username: 'blah', password: 'blah'});
            userCount = await db('users');
            expect(userCount).toHaveLength(1);
        })
        it('inserts provided username', async () => {
            let user;
            await Table.add({username: 'yada', password: 'yada'});
            user = await db('users').first();
            expect(user.username).toBe('yada');
        })
    })
})