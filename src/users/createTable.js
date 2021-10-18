const { Pool } = require('pg');

async function createTable() {
    const pool = new Pool({
        ssl: { rejectUnauthorized: false },
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS TestUsers (login varchar(70), password varchar(32), Nodes TEXT)');
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = createTable;