const pg = require('pg')

const pool = new pg.Pool({
    // Check name of DB in instructions
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
})

module.exports = pool;