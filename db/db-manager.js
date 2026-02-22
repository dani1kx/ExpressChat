const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "python",
    port: 5432,
    schema: "public"
})

module.exports = pool