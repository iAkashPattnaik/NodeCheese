const { Pool } = require('pg');

async function insertToDatabase(login, password) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query(`
        INSERT INTO TestUsers (login, password, Nodes)
        SELECT * FROM (SELECT $1, $2, '') AS tmp
        WHERE NOT EXISTS (
            SELECT login FROM TestUsers WHERE login = $1
        ) LIMIT 1;`, [login, password]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = insertToDatabase;