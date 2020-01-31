const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findById,
    findBy
}

function add(user){
    return db('users')
    .insert(user, 'id')
    .then(([id]) => {
        return findById(id);
    })
}

function findById(id){
    return db('users').where({id}).select('id', 'username');
}

function findBy(filter){
    return db('users').where(filter).select('id', 'username', 'password').first()
}