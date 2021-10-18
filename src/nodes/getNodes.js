const { Pool } = require('pg');

async function getNodes(login) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        const result = await (await pool.query('SELECT * FROM TestNodes WHERE login = $1', [login])).rows[0].nodes;
        pool.end();
        return result;
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

module.exports = getNodes;