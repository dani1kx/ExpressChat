const express = require('express');
const pool = require("../db/db-manager");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//GET localhost:3000/items/init
router.get('/init', async function (req, res, next) {
    await pool.query(`
        Create table users1
        (
            id       serial primary key,
            username varchar NOT NULL unique,
            password varchar
        );
    `)
    res.send('created table users1');
})

router.post('/login', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password

    userService.authenticate(username, password)
        .then(result => {res.json(result)})
        .catch(err => res.status(401).send(err));
})

router.post('/register', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let passwordSecond = req.body.passwordSecond

    if (password != passwordSecond) {
        res.status(400).send("password not match");
    }

    userService.create({username, password})
        .then(result => res.json(result))
        .catch(err => res.status(400).send(err.message));
})

module.exports = router;
