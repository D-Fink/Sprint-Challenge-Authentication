const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./auth-model.js');

router.post('/register', (req, res) => {
  const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    User.add(user)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'error registering username'})
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

    User.findBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.loggedIn = true;
            req.session.userId = user.id;
            res.status(200).json({message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({message: 'Invalid Credentials'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router;
