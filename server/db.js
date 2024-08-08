const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Nosh',
    password: 'Fsbtse202',
    port: 5432, // default port for PostgreSQL
});

module.exports = pool;