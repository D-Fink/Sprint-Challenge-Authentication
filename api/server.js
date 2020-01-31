const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConnection = require('../database/dbConfig.js');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'originalsid',
        secret: process.env.SESSION_SECRET || 'yada yada yada',
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: false, //true when pushed to production
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: true, //laws dictate you must inform user youre using cookies before this can be true
        store: new KnexSessionStore({ //persists session information through database
            knex: dbConnection,
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 60000
        })
}

server.use(helmet());
server.use(cors());
server.use(session(sessionConfig))
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
