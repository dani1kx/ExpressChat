const express = require('express');
const pool = require("../db/db-manager");
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

    const result = await pool.query(`
        select *
        from users1
        where username = $1
          and password = $2
    `, [username, password])

    res.json(result.rows)
})

router.post('/register', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let passwordSecond = req.body.passwordSecond

    if (password != passwordSecond) {
        res.status(400).send("password not match");
    }

    const result = await pool.query(`
        insert into users1 (username, password)
        values ($1, $2)
    `, [username, password])

    res.json(result.rows)
})


module.exports = router;
