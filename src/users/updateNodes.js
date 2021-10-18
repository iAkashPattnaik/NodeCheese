const { Pool } = require('pg');

async function updateNodes(login, nodeId) {
    const pool = new Pool({
        ssl: { rejectUnauthorized: false },
        connectionString: process.env.databaseUrl,
    });
    try {
        const existingNodes = await (await pool.query('SELECT * FROM TestUsers WHERE login = $1', [login])).rows[0].nodes;
        await pool.query(`
        UPDATE TestUsers
        SET Nodes = $2
        WHERE login = $1`, [login, `${existingNodes}${nodeId};`]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = updateNodes;