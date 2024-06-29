const Pool= require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "ayesha123",
    host: "localhost",
    port: 5432,
    database : "restaurant"
})

module.exports = pool;