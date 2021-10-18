const { Pool } = require('pg');

async function createTable() {
    const pool = new Pool({
        ssl: { rejectUnauthorized: false },
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS TestNodes (nodeId TEXT, node_data TEXT)');
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = createTable;