const { Pool } = require('pg');

async function getNodeData(nodeId) {
    const pool = new Pool({
        ssl: { rejectUnauthorized: false },
        connectionString: process.env.databaseUrl,
    });
    try {
        var result = await pool.query('SELECT * FROM TestNodes WHERE nodeId = $1', [nodeId]);
        pool.end();
        return result;
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

module.exports = getNodeData;