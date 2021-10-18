const { Pool } = require('pg');

async function insertNode(nodeId, node_data) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query(`
        INSERT INTO TestNodes (nodeId, node_data)
        SELECT * FROM (SELECT $1, $2) AS tmp
        WHERE NOT EXISTS (
            SELECT nodeId FROM TestNodes WHERE nodeId = $1
        ) LIMIT 1;`, [nodeId, node_data]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = insertNode;